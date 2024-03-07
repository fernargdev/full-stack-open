import { useState } from 'react'

const Blog = ({ blog, updateLikes }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }

    try {
      updateLikes(updatedBlog)
    } catch (err) {
      console.log(err)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </div>

      {detailsVisible && (
        <div>
          {blog.url}
          <br />
          likes {blog.likes} <button onClick={handleLike}>like</button>
          <br />
          {blog.user.name}
        </div>
      )}
    </div>
  )
}

export default Blog
