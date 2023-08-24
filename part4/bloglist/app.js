const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('express-async-errors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

logger.info('connecting to:', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
    .then(logger.info('connected to mongoDB'))
    .catch(error => logger.error('error connecting to mongoDB:', error.message))

app.disable('x-powered-by')
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/', (request, response) => {
    response.status(200).send("<h1>Blogs app</h1>")
})

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app