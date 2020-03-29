import path from "path"
import bodyParser from "body-parser"
import serverSentEvent from "./serverSentEvent.js"
import { createGame, deleteGame, terminateGame } from "../domain/gameManager/GameManagerCommands.js"
import { sendMessage } from "../domain/chat/ChatCommands.js"
import { isNotEmpty } from "../utils/strings.js"

/**
 * @param {Express} app
 * @param {GameManager} gameManager
 * @param {Chat} chat
 */
export function buildRouter({ app, gameManager, chat }) {
  const jsonParser = bodyParser.json()

  app.get("/", (req, res) => {
    res.sendFile(path.resolve("views/index.html"))
  })

  app.get("/game-manager/events", serverSentEvent(gameManager))

  app.post("/game-manager/create-game", jsonParser, (req, res) => {
    if (isNotEmpty(req.body.name)) {
      gameManager.push(createGame({ name: req.body.name }))
      res.status(200).send("ok")
    } else {
      res.status(400).send("Please provide a valid name")
    }
  })

  app.post("/game-manager/delete-game", jsonParser, (req, res) => {
    if (isNotEmpty(req.body.id)) {
      gameManager.push(deleteGame({ id: req.body.id }))
      res.status(200).send("ok")
    } else {
      res.status(400).send("Please provide a valid game id")
    }
  })

  app.post("/game-manager/terminate-game", jsonParser, (req, res) => {
    if (isNotEmpty(req.body.id)) {
      gameManager.push(terminateGame({ id: req.body.id }))
      res.status(200).send("ok")
    } else {
      res.status(400).send("Please provide a valid game id")
    }
  })

  app.get("/chat/events", serverSentEvent(chat))

  app.post("/chat/send", jsonParser, (req, res) => {
    const { pseudo, message } = req.body
    if (isNotEmpty(pseudo) && isNotEmpty(message)) {
      chat.push(sendMessage({ pseudo, message }))
      res.status(200).send("ok")
    } else {
      res.status(400).send("Please provide a valid pseudo and message")
    }
  })
}