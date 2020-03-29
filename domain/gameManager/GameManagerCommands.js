/**
 * @typedef { CreateGame | DeleteGame | TerminateGame } GameManagerCommand
 */

/**
 * @typedef {{ type: string, data: CreateGameData }} CreateGame
 * @typedef {{ name: string }} CreateGameData
 * @param {CreateGameData} data
 * @returns {CreateGame}
 */
export function createGame(data) {
  return {
    type: "createGame",
    data
  }
}

/**
 * @typedef {{ type: string, data: DeleteGameData }} DeleteGame
 * @typedef {{ id: string }} DeleteGameData
 * @param {DeleteGameData} data
 * @returns {DeleteGame}
 */
export function deleteGame(data) {
  return {
    type: "deleteGame",
    data
  }
}

/**
 * @typedef {{ type: string, data: TerminateGameData }} TerminateGame
 * @typedef {{ id: string }} TerminateGameData
 * @param {TerminateGameData} data
 * @returns {TerminateGame}
 */
export function terminateGame(data) {
  return {
    type: "terminateGame",
    data
  }
}