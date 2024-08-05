// dependencies
import { useContext, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

// contexts
import UserContext from './UserContext';
import { useNotificationDispatch } from './NotificationContext';

// services
import blogService from './services/blogs';

// components
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';

const App = () => {
  const [user, userDispatch] = useContext(UserContext);
  const notificationDispatch = useNotificationDispatch();

  const blogFormRef = useRef();
  const readBlog = blogService.getAll;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: 'LOGIN', payload: user });
      blogService.setToken(user.token);
    }
  }, [userDispatch]);

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser');
      userDispatch({ type: 'LOGOUT' });
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: 'Logged out',
      });
    } catch (err) {
      console.log(err);
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `Error: ${err.response}`,
      });
    }
  };

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: readBlog,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  if (result.isLoading) return <div>Loading data...</div>;

  if (result.isError)
    return <div>Blog service not available due to problems in server</div>;

  const blogs = result.data;

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
            <BlogForm blogFormRef={blogFormRef} />
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
