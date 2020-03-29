/**
 * @typedef { SentMessage } ChatEvent
 */

/**
 * @typedef {{ type: string, data: SentMessageData }} SentMessage
 * @typedef {{ pseudo: string, message: string }} SentMessageData
 * @param {SentMessageData} data
 * @returns {SentMessage}
 */
export function sentMessage(data) {
  return {
    type: "sentMessage",
    data
  }
}