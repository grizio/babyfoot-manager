/**
 * @typedef { CreatedGame | DeletedGame | TerminatedGame } GameManagerEvent
 */

/**
 * @typedef {{ index: number, type: string, data: CreatedGameData }} CreatedGame
 * @typedef {{ id: string, name: string }} CreatedGameData
 * @param {CreatedGameData} data
 * @returns {CreatedGame}
 */
export function createdGame(data) {
  return {
    type: "createdGame",
    data
  }
}

/**
 * @typedef {{ index: number, type: string, data: DeletedGameData }} DeletedGame
 * @typedef {{ id: string }} DeletedGameData
 * @param {DeletedGameData} data
 * @returns {DeletedGame}
 */
export function deletedGame(data) {
  return {
    type: "deletedGame",
    data
  }
}

/**
 * @typedef {{ index: number, type: string, data: TerminatedGameData }} TerminatedGame
 * @typedef {{ id: string }} TerminatedGameData
 * @param {TerminatedGameData} data
 * @returns {TerminatedGame}
 */
export function terminatedGame(data) {
  return {
    type: "terminatedGame",
    data
  }
}