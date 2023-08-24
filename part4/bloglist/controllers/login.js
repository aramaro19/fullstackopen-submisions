const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const user = await User.findOne({ username: body.username })
  const isPasswordCorret = user === null 
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && isPasswordCorret)) {
    return response.status(401).json({error: 'invalid username or password'})
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter