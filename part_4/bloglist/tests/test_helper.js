const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'John Doe',
    url: 'https://github.com/fernargdev',
    likes: 5,
  },
  {
    title: 'Browser can execute only JavaScript',
    author: 'Jane Doe',
    url: 'www.google.com',
    likes: 10,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

const loginUser = async () => {
  const newUser = {
    username: 'hellas',
    name: 'Arto Hellas',
    password: 'Fernando1234',
  }

  await api.post('/api/users').send(newUser)
  const result = await api.post('/api/login').send(newUser)
  return `Bearer ${result.body.token}`
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  loginUser,
}
