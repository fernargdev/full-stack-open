const mongoose = require('mongoose')
const config = require('../utils/config')
const url = config.MONGODB_URI

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

mongoose.connect(url, {
  serverSelectionTimeoutMS: 100000000,
})

module.exports = mongoose.model('Blog', blogSchema)
