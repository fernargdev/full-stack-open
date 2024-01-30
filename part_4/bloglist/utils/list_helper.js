const lodash = require('lodash')

// dummy returns one
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

// totalLikes returns the sum of likes
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

// favoriteBlog returns the blog with the most likes
const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite
  }, blogs[0] || null)
}

// mostBlogs returns the author with the most blogs
const mostBlogs = (blogs) => {
  const authors = lodash.groupBy(blogs, 'author')
  const authorBlogs = lodash.map(authors, (blogs, author) => ({
    author,
    blogs: blogs.length,
  }))
  return lodash.maxBy(authorBlogs, 'blogs') || null
}

// mostLikes returns the author with the most likes
const mostLikes = (blogs) => {
  const authors = lodash.groupBy(blogs, 'author')
  const authorLikes = lodash.map(authors, (blogs, author) => ({
    author,
    likes: lodash.sumBy(blogs, 'likes'),
  }))
  return lodash.maxBy(authorLikes, 'likes') || null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
