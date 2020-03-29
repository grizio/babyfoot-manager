import * as api from "../api.js"
import ServerSentEventObservable from "./ServerSentEventObservable.js"
import { createButton, createLi, createSpan, removeNode } from "../utils/dom.js"

const sseGameObservable = new ServerSentEventObservable("/game-manager/events")

sseGameObservable.on(event => {
  switch (event.type) {
    case "createdGame":
      return onCreatedGame(event)
    case "deletedGame":
      return onDeletedGame(event)
    case "terminatedGame":
      return onTerminatedGame(event)
    default:
    // ignore
  }
})

/**
 * @param {CreatedGame} event
 */
function onCreatedGame(event) {
  const li = createLi({
    classes: ["game"],
    id: `game-${event.data.id}`,
    children: [
      createButton({
        classes: ["terminate"],
        children: [String.fromCodePoint(0x2705)],
        onClick: (e) => {
          e.preventDefault()
          api.terminateGame(event.data.id)
        }
      }),

      createSpan({
        classes: ["name"],
        children: [event.data.name]
      }),

      createButton({
        classes: ["delete"],
        children: [String.fromCodePoint(0x274C)],
        onClick: (e) => {
          e.preventDefault()
          api.deleteGame(event.data.id)
        }
      }),
    ]
  })

  document.getElementById("games").appendChild(li)

  updateCurrentGameCount()
}

/**
 * @param {DeletedGame} event
 */
function onDeletedGame(event) {
  removeNode(document.getElementById(`game-${event.data.id}`))

  updateCurrentGameCount()
}

/**
 * @param {TerminatedGame} event
 */
function onTerminatedGame(event) {
  const gameNode = document.getElementById(`game-${event.data.id}`)
  if (gameNode !== undefined) {
    gameNode.classList.add("terminated")
  }

  updateCurrentGameCount()
}

function updateCurrentGameCount() {
  const count = document.querySelectorAll("#games > li:not(.terminated)").length
  document.getElementById("current-games-count").textContent = count.toString()
}

function initializeGameCreation() {
  document.getElementById("create-game").addEventListener("submit", event => {
    event.preventDefault()
    let createGameNameNode = document.getElementById("create-game-name");
    const name = createGameNameNode.value
    if (name !== undefined && name !== null && name !== "") {
      api.createGame(name)
      createGameNameNode.value = ""
    }
  })
}

// initialize
updateCurrentGameCount()
initializeGameCreation()