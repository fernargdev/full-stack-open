// Dependencies
const express = require('express')
const app = express()

require('dotenv').config()
const cors = require('cors')

const Blog = require('./models/blog')

// Middlewares
app.use(cors())
app.use(express.json())

// Rutes
app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

// Listen
const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`)
})
