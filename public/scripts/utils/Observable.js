/**
 * @typedef {function(T): void} Listener
 * @template T
 */

/**
 * @class
 * @template T
 */
export default class Observable {
  constructor() {
    /**
     * @private
     * @type Array<Listener<T>>
     */
    this.listeners = []
  }

  /**
   * @public
   * @param {Listener<T>} listener
   */
  on = (listener) => {
    this.listeners = [...this.listeners, listener]
  }

  /**
   * @public
   * @param {Listener<T>} listener
   */
  off = (listener) => {
    this.listeners = this.listeners.filter(_ => _ !== listener)
  }

  /**
   * @public
   * @param {T} element
   */
  push = (element) => {
    this.listeners.forEach(listener => listener(element))
  }
}