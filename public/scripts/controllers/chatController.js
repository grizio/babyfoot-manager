import * as api from "../api.js"
import ServerSentEventObservable from "./ServerSentEventObservable.js"
import { createLi, createSpan, createStrong } from "../utils/dom.js"

const sseChatObservable = new ServerSentEventObservable("/chat/events")

sseChatObservable.on(event => {
  switch (event.type) {
    case "sentMessage":
      return onSentMessage(event)
    default:
    // ignore
  }
})

/**
 * @param {SentMessage} event
 */
function onSentMessage(event) {
  const li = createLi({
    classes: ["message"],
    children: [
      createStrong({
        children: [event.data.pseudo]
      }),

      createSpan({
        children: [event.data.message]
      })
    ]
  })

  document.getElementById("messages").appendChild(li)
}

function initializeChatCreation() {
  const definePseudoForm = document.getElementById("define-pseudo")
  const pseudoNode = document.getElementById("pseudo")
  const createMessageForm = document.getElementById("create-message")

  definePseudoForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const pseudo = document.getElementById("define-pseudo-pseudo").value
    if (pseudo !== null && pseudo !== undefined && pseudo !== "") {
      definePseudoForm.classList.add("hidden")
      createMessageForm.classList.remove("hidden")
      pseudoNode.textContent = pseudo
    }
  })

  createMessageForm.addEventListener("submit", event => {
    event.preventDefault()
    const pseudo = document.getElementById("define-pseudo-pseudo").value
    const messageNode = document.getElementById("create-message-message");
    const message = messageNode.value
    if (message !== null && message !== undefined && message !== "") {
      api.sendMessage({ pseudo, message })
      messageNode.value = ""
    }
  })
}

// initialize
initializeChatCreation()