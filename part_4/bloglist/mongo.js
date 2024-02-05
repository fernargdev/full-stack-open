const mongoose = require('mongoose')

// // Testing
// if (process.argv.length < 3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

if (process.argv.length < 6) {
  console.log('give the necessary arguments to create a new blog')
  process.exit(1)
}

const password = process.argv[2]
const title = process.argv[3]
const author = process.argv[4]
const blogUrl = process.argv[5]
const likes = Number(process.argv[6])

// const url = `mongodb+srv://angel:${password}@phonebook.iyv8gsv.mongodb.net/phonebookApp?retryWrites=true&w=majority`
const url = `mongodb+srv://angel:${password}@phonebook.iyv8gsv.mongodb.net/testBloglistApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url, {
  serverSelectionTimeoutMS: 1000000000,
})

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: title,
  author: author,
  url: blogUrl,
  likes: likes,
})

blog.save().then(() => {
  console.log(`added ${title} of ${author} located in ${blogUrl} with ${likes}`)
  mongoose.connection.close()
})

// // Testing
// Person.find({}).then((result) => {
//   result.forEach((person) => {
//     console.log(person)
//   })
//   mongoose.connection.close()
// })
