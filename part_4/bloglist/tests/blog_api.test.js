const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

mongoose.set('bufferTimeoutMS', 30000)
jest.setTimeout(30000)

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

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

// Integration test: /api/blogs
describe('tests the endpoint that obtains the notes', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('the unique identifier property of blog posts it is called id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
