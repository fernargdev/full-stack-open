import { useEffect, useRef } from 'react';

// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { readBlog } from './reducers/blogsReducer';
import { logoutUser, readUser } from './reducers/userReducer';
// import { createNotification } from './reducers/notificationReducer';

// react-query
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNotificationDispatch } from './NotificationContext';

import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';

const App = () => {
  // react-redux
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.data);
  const user = useSelector((state) => state.user.user);

  // react-query
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(readBlog());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      dispatch(readUser(loggedUserJSON));
    }
  }, [dispatch]);

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      // dispatch(createNotification('Logged out'));
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: 'Logged out',
      });
    } catch (err) {
      console.log(err);
      // dispatch(createNotification(`Error: ${err.response}`));
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `Error: ${err.response}`,
      });
    }
  };

  return (
    <div>
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

export default App;
