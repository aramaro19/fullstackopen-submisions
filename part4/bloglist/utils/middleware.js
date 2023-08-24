const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path), logger.info('Body: ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unkown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongooseError') {
    return response.status(503).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'SyntaxError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

const userExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (!(authorization && authorization.toLowerCase().startsWith('bearer '))) {
        return response.status(401).json({error: 'missing token'})
    } else {
      const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({error: 'invalid token'})
      }
      request.user = decodedToken
      next()
    }
  }

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
}
