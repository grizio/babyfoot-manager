export function createGame(name) {
  return fetch("/game-manager/create-game", {
    method: "post",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export function deleteGame(id) {
  return fetch("/game-manager/delete-game", {
    method: "post",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export function terminateGame(id) {
  return fetch("/game-manager/terminate-game", {
    method: "post",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export function sendMessage({ pseudo, message }) {
  return fetch("/chat/send", {
    method: "post",
    body: JSON.stringify({ pseudo, message }),
    headers: {
      "Content-Type": "application/json"
    }
  })
}