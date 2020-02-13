const memorycache = require('memory-cache')

const cache = duration => {
  return (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.originalUrl
    const cacheContent = memorycache.get(key)
    if (cacheContent) {
      console.log('fetching from cache')
      res.send(cacheContent)
      return
    } else {
      console.log('fetching from uljas api')
      res.sendResponse = res.send
      res.send = body => {
        memorycache.put(key, body, duration * 1000)
        res.sendResponse(body)
      }
      next()
    }
  }
}

module.exports = { cache:cache }
