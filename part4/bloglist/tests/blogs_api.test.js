const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany()
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)


}, 25000)

const blog = {
  title: 'New blog',
  author: 'Alex',
  url: 'my.url.com',
}

const noLikes = {
  title: 'New blog no likes',
  author: 'Alex',
  url: 'my.2url.com',
}

const noTitle = {
  author: 'Alex',
  url: 'my.url.com',
  likes: 1,
}

const noUrl = {
  title: 'New blog no url',
  author: 'Alex',
  likes: 3,
}

describe('API calls', () => {
  var token = null
  beforeEach(done => {
    api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .end((err, res) => {
        token = res.body.token 
        done()
      })
  })

  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 14000)

  test('id identifier is defined', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(blog)
      .expect(200)
    expect(response.body.id).toBeDefined()
  }, 14000)

  test('new blog post is created correctly', async () => {
    const initialBlogs = await helper.blogsInDb()
    await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
    .send(blog)
    .expect(200)

    const finalBLogs = await helper.blogsInDb()

    expect(finalBLogs.length).toBe(initialBlogs.length + 1)
  }, 35000)

  test('post with no likes sets likes to 0', async () => {
    const post = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(noLikes)
    expect(post.body.likes).toEqual(0)
  }, 14000)

  test('with no title send status 400', async () => {
    await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
    .send(noTitle)
    .expect(400)
  })

  test('with no url send status 400', async () => {
    await api.post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
    .send(noUrl)
    .expect(400)
  })

  test('delete blog works fine', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  }, 14000)

  test('update likes by id works fine', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 15 })

    expect(response.body.likes).toEqual(15)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
