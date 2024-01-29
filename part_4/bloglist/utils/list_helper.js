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
  if (blogs.length === 0) return null

  let favorite = blogs[0]
  blogs.forEach((blog) => {
    if (blog.likes > favorite.likes) favorite = blog
  })

  return favorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
