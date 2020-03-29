import Observable from "../utils/Observable.js"

export default class ServerSentEventObservable extends Observable {
  /**
   * @param {string} url
   */
  constructor(url) {
    super()
    this.url = url
    this.lastEventIndex = 0

    this.restartEventSource()
  }

  restartEventSource = () => {
    const eventSource = new EventSource(`${this.url}?after=${this.lastEventIndex}`)

    eventSource.onmessage = (event) => {
      const parsedEvent = JSON.parse(event.data)
      this.lastEventIndex = parsedEvent.index
      this.push(parsedEvent)
    }

    eventSource.onerror = () => {
      eventSource.close()
      setTimeout(this.restartEventSource, 1000)
    }
  }
}