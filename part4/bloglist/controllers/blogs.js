const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, id: 1})
  response.status(200).json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { body } = request

  const user = await User.findById(request.user.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ?? 0,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const { id } = request.params
  
  const blogToDelete = await Blog.findById(id)
  console.log('blog to delete user', blogToDelete.user)
  console.log('request.user.id: ', request.user.id)
  if(!blogToDelete ) {
    return response.status(404).json({error: 'blog not found'})
  } else if(blogToDelete.user.toString() !== request.user.id) {
    return response.status(401).json({error: 'blog is not from this user'})
  }
  await Blog.findByIdAndRemove(id)
  return response.status(204).end()
  
})

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request
  const blog = {
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter
