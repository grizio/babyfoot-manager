import uuid from "uuid"
import { createdGame, deletedGame, terminatedGame } from "./GameManagerEvents.js"
import EventProcessor from "../EventProcessor.js"

/**
 * @typedef {{ persistence: EventSourcingPersistence }} GameManagerDependencies
 * @typedef {Array<Game>} State
 * @typedef {{ id: string, name: string, terminated: boolean }} Game
 *
 * @implements {EventObservable<GameManagerEvent>>}
 */
export default class GameManager extends EventProcessor {
  /**
   * @param {GameManagerDependencies} dependencies
   */
  constructor(dependencies) {
    super({
      persistence: dependencies.persistence,
      initialState: []
    })
  }

  /**
   * @private
   * @param {State} state
   * @param {GameManagerCommand} command
   * @return {Array<GameManagerEvent>}
   */
  applyCommand = (state, command) => {
    switch (command.type) {
      case "createGame":
        return [
          createdGame({
            id: uuid.v4(),
            name: command.data.name
          })
        ]

      case "deleteGame":
        if (state.some(game => game.id === command.data.id)) {
          return [
            deletedGame({
              id: command.data.id
            })
          ]
        } else {
          return []
        }

      case "terminateGame":
        if (state.some(game => game.id === command.data.id)) {
          return [
            terminatedGame({
              id: command.data.id
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
   * @param {GameManagerEvent} event
   * @return {State}
   */
  applyEvent = (state, event) => {
    switch (event.type) {
      case "createdGame":
        const newGame = {
          id: event.data.id,
          name: event.data.name,
          terminate: false
        }
        return [...state, newGame]

      case "deletedGame":
        return state.filter(game => game.id !== event.data.id)

      case "terminatedGame":
        return state.map(game => {
          if (game.id === event.data.id) {
            return {
              ...game,
              terminated: true
            }
          } else {
            return game
          }
        })

      default:
        return state
    }
  }
}
