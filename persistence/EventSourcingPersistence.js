/**
 * @typedef {{ store:string, db: Db }} EventSourcingPersistenceDependencies
 */
export default class EventSourcingPersistence {
  /**
   * @param {EventSourcingPersistenceDependencies} dependencies
   */
  constructor(dependencies) {
    this.store = dependencies.store
    this.db = dependencies.db
  }

  /**
   * @return {Promise<Array.>} ordered events
   */
  findAll = () => {
    return this.db.withConnection(async client => {
      const query = "SELECT * FROM event_store WHERE store = $1 ORDER BY id ASC"
      const values = [this.store]

      const result = await client.query(query, values)

      return result.rows.map(row => ({ ...row.event, index: row.id }))
    })
  }

  /**
   * @param {number} after
   * @return {Promise<Array.>} ordered events
   */
  findAfter = (after) => {
    return this.db.withConnection(async client => {
      const query = "SELECT * FROM event_store WHERE store = $1 AND id > $2 ORDER BY id ASC"
      const values = [this.store, after]

      const result = await client.query(query, values)

      return result.rows.map(row => ({ ...row.event, index: row.id }))
    })
  }

  /**
   * @param {Array<*>} events: The event to store
   * @return {Promise<void>}
   */
  persist = (events) => {
    return this.db.withTransaction(async client => {
      const result = []

      const query = "INSERT INTO event_store(store, event) VALUES ($1, $2) RETURNING id"

      for (let i = 0; i < events.length; i++) {
        const values = [this.store, events[i]]
        const insertResult = await client.query(query, values)

        result.push({
          ...events[i],
          index: insertResult.rows[0].id
        })
      }

      return result
    })
  }
}