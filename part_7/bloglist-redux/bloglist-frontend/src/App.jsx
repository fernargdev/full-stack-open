import { useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { readBlog } from './reducers/blogsReducer';
import { createNotification } from './reducers/notificationReducer';
import { logoutUser, readUser } from './reducers/userReducer';
import { getAllUsers } from './reducers/usersReducer';

import { Routes, Route, Link } from 'react-router-dom';

// components
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';

const HomePage = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.data);
  const user = useSelector((state) => state.user.user);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(readBlog());
  }, [dispatch]);

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>

          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} username={user.username} />
            ))}
        </div>
      )}
    </div>
  );
};

const UserPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td>{}</td>
            <td>
              <span>blogs created</span>
            </td>
          </tr>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.username}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      dispatch(readUser(loggedUserJSON));
    }
  }, [dispatch]);

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      dispatch(createNotification('Logged out'));
    } catch (err) {
      console.log(err);
      dispatch(createNotification(`Error: ${err.response}`));
    }
  };

  return (
    <>
      <h1>Blogs</h1>

      <Notification />

      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <p>
            {user.name} logged in
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </p>
        </div>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UserPage />} />
      </Routes>
    </>
  );
};

export default App;
