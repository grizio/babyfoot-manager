/**
 * @param {EventProcessor} observable
 * @return {function(Request, Response): void}
 * @template T
 */
export default function serverSentEvent(observable) {
  return (req, res) => {
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.flushHeaders()

    const listener = (event) => {
      res.write(`data: ${JSON.stringify(event)}\n\n`)
    }

    observable.addEventListener(listener, req.query.after || undefined)

    res.on('close', () => {
      res.end();
      observable.removeEventListener(listener)
    })
  }
}