import { useContext, useState } from 'react';

// react-query
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNotificationDispatch } from '../NotificationContext';
import loginService from '../services/login';
import blogService from '../services/blogs';
import UserContext from '../UserContext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // react-query
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const [user, userDispatch] = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch({ type: 'LOGIN', payload: user });

      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `Logged in as ${username}`,
      });

      setUsername('');
      setPassword('');
    } catch (err) {
      console.log(err);

      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `Error: ${err.response.data.error}`,
      });
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            name="Username"
            data-testid="username"
            autoComplete="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="Password"
            data-testid="password"
            autoComplete="current-password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
