import { useState, useEffect } from 'react'

import Blog from './components/Blog'

import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [message, setMessage] = useState({
    message: null,
    isError: false,
  })

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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
    setUsername('')
    setPassword('')
    window.location.reload()
  }

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const blogObject = {
        title,
        author,
        url,
      }

      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          // autoComplete="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          // autoComplete="current-password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="url"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  const notification = ({ message, isError }) => {
    if (message === null) {
      return null
    }

    const className = isError ? 'error' : 'note'
    return <div className={className}>{message}</div>
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        {notification({ message: message.message, isError: message.isError })}
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification({ message: message.message, isError: message.isError })}
      <p>
        {user.name} logged in
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>

      <h2>create new</h2>
      {blogForm()}

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
