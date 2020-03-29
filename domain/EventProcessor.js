/**
 * @typedef {function(event: T): void} Listener
 * @template T
 */

/**
 * @abstract
 * @template Command
 * @template Event
 * @template State
 *
 * @typedef {{
 *   persistence: EventSourcingPersistence,
 *   initialState: State
 * }} EventProcessorDependencies
 */
export default class EventProcessor {
  /**
   * @param {EventProcessorDependencies} dependencies
   */
  constructor(dependencies) {
    this.persistence = dependencies.persistence

    this.queue = []
    this.current = undefined
    this.state = dependencies.initialState
    this.listeners = []

    this.initialize()
  }

  /**
   * @private
   */
  initialize = async () => {
    // There is a possible issue here: We could eventually push a command before processing all events
    // It could be resolved by waiting the initialization before the server is available
    // Because of the context of the project, this issue was ignored
    const events = await this.persistence.findAll()
    events.forEach(this.processEvent)
  }

  /**
   * @public
   * @param {Listener<Event>} listener
   * @param {number?} after
   * @return {void}
   */
  addEventListener = (listener, after) => {
    // There is a possible issue here: We could eventually push an event before processing all existing events
    // It could be resolved with a better queuing system across all listeners.
    // Because of the context of the project, this issue was ignored
    this.persistence.findAfter(after || 0)
      .then(events => {
        events.forEach(event => listener(event))
        this.listeners = [...this.listeners, listener]
      })
  }

  /**
   * @public
   * @param {Listener<Event>} listener
   */
  removeEventListener = (listener) => {
    this.listeners = this.listeners.filter(existingListener => existingListener !== listener)
  }

  /**
   * @public
   * @param {Command} command
   */
  push = (command) => {
    this.queue = [...this.queue, command]
    this.processQueue()
  }

  /**
   * @private
   */
  processQueue = () => {
    if (this.current === undefined) {
      const [head, ...tail] = this.queue
      if (head !== undefined) {
        this.queue = tail
        this.current = this.processCommand(head)
          .then(() => {
            this.current = undefined
            this.processQueue()
          })
      }
    }
  }

  /**
   * @private
   * @param {ChatCommand} command
   * @return {Promise<void>}
   */
  processCommand = async (command) => {
    const newEvents = this.applyCommand(this.state, command)
    const newEventsWithIndex = await this.persistence.persist(newEvents)
    newEventsWithIndex.forEach(this.processEvent)
  }

  /**
   * @param {ChatEvent} event
   */
  processEvent = (event) => {
    this.state = this.applyEvent(this.state, event)
    this.listeners.forEach(listener => listener(event))
  }
}