import { sentMessage } from "./ChatEvents.js"
import EventProcessor from "../EventProcessor.js";

/**
 * @typedef {{ persistence: EventSourcingPersistence }} ChatDependencies
 * @typedef {Array<ChatMessage>} ChatState
 * @typedef {{ pseudo: string, message: string }} ChatMessage
 *
 * @extends {EventProcessor<ChatCommand, ChatEvent, ChatState>}
 */
export default class Chat extends EventProcessor {
  /**
   * @param {ChatDependencies} dependencies
   */
  constructor(dependencies) {
    super({
      persistence: dependencies.persistence,
      initialState: []
    })
  }

  /**
   * @private
   * @param {ChatState} state
   * @param {ChatCommand} command
   * @return {Array<ChatEvent>}
   */
  applyCommand = (state, command) => {
    switch (command.type) {
      case "sendMessage":
        const lastMessage = state[state.length - 1]
        if (
          lastMessage === undefined ||
          lastMessage.pseudo !== command.data.pseudo ||
          lastMessage.message !== command.data.message
        ) {
          return [
            sentMessage({
              pseudo: command.data.pseudo,
              message: command.data.message
            })
          ]
        } else {
          return []
        }

      default:
        return []
    }
  }

  /**
   * @param {State} state
   * @param {ChatEvent} event
   * @return {State}
   */
  applyEvent = (state, event) => {
    switch (event.type) {
      case "sentMessage":
        const newMessage = {
          pseudo: event.data.pseudo,
          message: event.data.message
        }
        return [...state, newMessage]

      default:
        return state
    }
  }
}
