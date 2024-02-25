const mongoose = require('mongoose')
const config = require('../utils/config')
const url = config.MONGODB_URI

const blogSchema = new mongoose.Schema({
  url: String,
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

mongoose.connect(url, {
  serverSelectionTimeoutMS: 100000000,
})

module.exports = mongoose.model('Blog', blogSchema)
