const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const blog = new Blog(request.body)
  const user = request.user

  blog.user = user._id

  if (!blog.title || !blog.url) return response.status(400).end()
  if (!blog.likes) blog.likes = 0

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const user = request.user

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    if (blog.user.toString() !== user.id) {
      return response.status(403).json({ error: 'unauthorized' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
)

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body
  const id = request.params.id

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
  }).populate('user', { username: 1, name: 1 })

  updatedBlog
    ? response.status(200).json(updatedBlog)
    : response.status(404).end()
})

module.exports = blogsRouter
