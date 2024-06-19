import { useState } from 'react';

// react-redux
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/userReducer';
// import { createNotification } from '../reducers/notificationReducer';

// react-query
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNotificationDispatch } from '../NotificationContext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // react-redux
  const dispatch = useDispatch();

  // react-query
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginUser(username, password));
      // dispatch(createNotification(`Logged in as ${username}`));
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `Logged in as ${username}`,
      });
      setUsername('');
      setPassword('');
    } catch (err) {
      console.log(err);
      // dispatch(createNotification(`Error: ${err.response}`));
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
