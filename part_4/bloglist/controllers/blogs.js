const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const users = await User.find({})

  if (!users) {
    return response.status(400).json({ error: 'No users found' })
  }

  blog.user = users[0]._id

  if (!blog.title || !blog.url) return response.status(400).end()
  if (!blog.likes) blog.likes = 0

  const savedBlog = await blog.save()
  users[0].blogs = users[0].blogs.concat(savedBlog._id)
  await users[0].save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true, context: 'query' }
  )

  response.json(updatedBlog)
})

module.exports = blogsRouter
