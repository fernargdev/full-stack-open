import { useState } from 'react'

const Blog = ({ blog, updateLikes, user, deleteBlog }) => {
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

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        deleteBlog(blog.id)
      } catch (err) {
        console.log(err)
      }
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
          <a href={blog.url}>{blog.url}</a>

          <div>
            <span>likes {blog.likes}</span>
            <button onClick={handleLike}>like</button>
          </div>

          {blog.user.name}

          {blog.user.username === user.username && (
            <div>
              <button onClick={handleDelete}>remove</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
