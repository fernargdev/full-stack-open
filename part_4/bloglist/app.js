const express = require('express')
const cors = require('cors')

require('express-async-errors')

const app = express()
const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
