// dummy returns one
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

// totalLikes returns the sum of likes
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

module.exports = {
  dummy,
  totalLikes,
}
