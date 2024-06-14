import { useState, useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { createNotification } from './reducers/notificationReducer';

import blogService from './services/blogs';
import loginService from './services/login';

import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      dispatch(createNotification(`Logged in as ${user.name}`));
    } catch (err) {
      dispatch(createNotification(`Error: ${err.response.data.error}`));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
    dispatch(createNotification('logged out'));
  };

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));

      dispatch(
        createNotification(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        )
      );
    } catch (err) {
      dispatch(createNotification(`Error: ${err.response.data.error}`));
    }
  };

  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject.id, blogObject);
      const newBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
      setBlogs(newBlogs);
    } catch (err) {
      dispatch(createNotification(`Error: ${err.response.data.error}`));
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId);
      const newBlogs = blogs.filter((blog) => blog.id !== blogId);
      setBlogs(newBlogs);
      dispatch(createNotification('blog deleted'));
    } catch (err) {
      dispatch(createNotification(`Error: ${err.response.data.error}`));
    }
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <p>
            {user.name} logged in
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                username={user.username}
                deleteBlog={deleteBlog}
                updateLikes={updateBlog}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
