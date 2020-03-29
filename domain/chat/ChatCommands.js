/**
 * @typedef { SendMessage } ChatCommand
 */

/**
 * @typedef {{ type: string, data: SendMessageData }} SendMessage
 * @typedef {{ pseudo: string, message: string }} SendMessageData
 * @param {SendMessageData} data
 * @returns {SendMessage}
 */
export function sendMessage(data) {
  return {
    type: "sendMessage",
    data
  }
}