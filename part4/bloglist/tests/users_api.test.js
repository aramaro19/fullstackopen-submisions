const User = require('../models/user')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../tests/test_helper')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      passwordHash,
    })
    await user.save()
  }, 14000)

  test('creation succeds with a fresh username', async () => {
    const initialUsers = await helper.usersInDb()
    const newUser = {
      username: 'takan',
      name: 'Tai Kanto',
      password: 'kanto',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-type', /application\/json/)

    const finalUsers = await helper.usersInDb()
    expect(finalUsers).toHaveLength(initialUsers.length + 1)

    const usernames = finalUsers.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  }, 14000)

  test('fails if username already exists', async() => {
    const initialUsers = await helper.usersInDb()
    const newUser = {
      username: 'root',
      name: 'Admin',
      password: 'admin'
    }
    const result = await api 
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)
    expect(result.body.error).toContain('expected `username` to be unique')

    const finalUsers = await helper.usersInDb()
    expect(finalUsers).toHaveLength(initialUsers.length)
  }, 14000)

  test('fails if username is less than 3 characters', async () => {
    const initialUsers = await helper.usersInDb()
    const newUser = {
      username: "Al",
      name: "Alejandro",
      password: "secret"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)
    expect(result.body.error).toContain('shorter than the minimum allowed length')

    const finalUsers = await helper.usersInDb()
    expect(finalUsers).toHaveLength(initialUsers.length)
  }, 14000)

  test('fails if username is missing', async () => {
    const initialUsers = await helper.usersInDb()
    const newUser = {
      name: "Alejandro",
      password: "secret"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)
    expect(result.body.error).toContain('User validation failed')

    const finalUsers = await helper.usersInDb()
    expect(finalUsers).toHaveLength(initialUsers.length)
  }, 14000)

  test('fails if password is too short', async () => {
    const initialUsers = await helper.usersInDb()
    const newUser = {
      username: 'alejo',
      name: "Alejandro",
      password: "se"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)
    expect(result.body.error).toContain('password too short')

    const finalUsers = await helper.usersInDb()
    expect(finalUsers).toHaveLength(initialUsers.length)
  }, 14000)

  test('fails if no password is provided', async () => {
    const initialUsers = await helper.usersInDb()
    const newUser = {
      username: 'alejo',
      name: "Alejandro",
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)
    expect(result.body.error).toContain('password too short or missing')

    const finalUsers = await helper.usersInDb()
    expect(finalUsers).toHaveLength(initialUsers.length)
  }, 14000)

  test('works if no name is provided', async () => {
    const initialUsers = await helper.usersInDb()
    const newUser = {
      username: 'alejo',
      password: 'sekret'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-type', /application\/json/)

    const finalUsers = await helper.usersInDb()
    expect(finalUsers).toHaveLength(initialUsers.length + 1)
  }, 14000)  

})
