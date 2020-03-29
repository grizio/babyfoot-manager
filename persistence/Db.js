import pg from "pg"

/**
 * @typedef {{config: Config}} Dependencies
 */
export default class Db {
  /**
   * @param {Dependencies} dependencies
   */
  constructor(dependencies) {
    /** @private */
    this.pool = new pg.Pool(dependencies.config.db)
  }

  /**
   * @param {function(Client): Promise<*>} op
   */
  withConnection = async (op) => {
    const client = await this.pool.connect()
    try {
      return await op(client)
    } finally {
      client.release()
    }
  }

  /**
   * @param {function(Client): Promise<*>} op
   */
  withTransaction = async (op) => {
    const client = await this.pool.connect()
    try {
      await client.query("BEGIN")
      const result = await op(client)
      await client.query("COMMIT")
      return result
    } catch (e) {
      console.error(e)
      await client.query("ROLLBACK")
      throw e
    } finally {
      client.release()
    }
  }
}