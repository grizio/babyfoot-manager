import express from "express"
import Db from "./persistence/Db.js"
import EventSourcingPersistence from "./persistence/EventSourcingPersistence.js"
import GameManager from "./domain/gameManager/GameManager.js"
import Chat from "./domain/chat/Chat.js"
import { buildRouter } from "./router/index.js"
import loadConfig from "./config.js"

function start() {
  const config = loadConfig()
  const db = new Db({ config })
  const gameManagerPersistence = new EventSourcingPersistence({ store: "gameManager", db })
  const chatPersistence = new EventSourcingPersistence({ store: "chat", db })

  const gameManager = new GameManager({ persistence: gameManagerPersistence })

  const chat = new Chat({ persistence: chatPersistence })

  const app = express()
  app.use("/public", express.static("public"))
  buildRouter({ app, gameManager, chat })

  app.listen(config.app.port, () => {
    console.log(`Application started on ${config.app.interface}:${config.app.port}`)
  })
}


try {
  start()
} catch (e) {
  console.error("Could not start application", e)
  throw e
}