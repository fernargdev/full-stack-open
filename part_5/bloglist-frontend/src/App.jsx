import { useState, useEffect, useRef } from 'react'

import loginService from './services/login'
import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({
    message: null,
    isError: false,
  })

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (err) {
      setMessage({
        message: 'wrong username or password',
        isError: true,
      })
      setTimeout(() => {
        setMessage({ message: null, isError: false })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    // setUsername('')
    // setPassword('')
    // window.location.reload()
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      blogFormRef.current.toggleVisibility()
      setMessage({
        message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      })
      setTimeout(() => {
        setMessage({
          message: null,
        })
      }, 5000)
    } catch (err) {
      setMessage({
        message: 'the title and url are required in a valid format',
        isError: true,
      })
      setTimeout(() => {
        setMessage({ message: null, isError: false })
      }, 5000)
    }
  }

  const updateLikes = async (blogObject) => {
    const updatedBlog = await blogService.update(blogObject.id, blogObject)
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    )
  }

  const deleteBlog = async (blogId) => {
    const deleteBlog = await blogService.deleteBlog(blogId)
    setBlogs(blogs.filter((blog) => blog.id !== blogId))
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        {Notification({ message: message.message, isError: message.isError })}
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {Notification({ message: message.message, isError: message.isError })}
      <p>
        {user.name} logged in
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>

      <h2>create new</h2>
      {blogForm()}

      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateLikes}
          user={user}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  )
}

export default App
