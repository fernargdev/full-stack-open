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

// Integration test: examples of the material
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

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map((r) => r.title)
  expect(titles).toContain('Browser can execute only JavaScript')
})

// Integration test: /api/blogs
describe('returns the correct number of blogs in JSON format', () => {
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
})

afterAll(async () => {
  await mongoose.connection.close()
})
