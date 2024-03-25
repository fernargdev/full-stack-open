const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog), {})
}

const mostBlogs = (blogs) => {
  if (!blogs.length) {
    return null
  }

  const authors = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1
    return acc
  }, {})

  let maxAuthor = Object.keys(authors)[0]

  for (const author in authors) {
    if (authors[author] > authors[maxAuthor]) {
      maxAuthor = author
    }
  }

  return {
    author: maxAuthor,
    blogs: authors[maxAuthor],
  }
}

const mostLikes = (blogs) => {
  if (!blogs.length) {
    return null
  }

  const authors = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes
    return acc
  }, {})

  let maxAuthor = Object.keys(authors)[0]

  for (const author in authors) {
    if (authors[author] > authors[maxAuthor]) {
      maxAuthor = author
    }
  }

  return {
    author: maxAuthor,
    likes: authors[maxAuthor],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
