import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/authReducer';
import { createNotification } from '../reducers/notificationReducer';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginUser(username, password));
      dispatch(createNotification(`Logged in as ${username}`));
      setUsername('');
      setPassword('');
    } catch (err) {
      dispatch(createNotification(`Error: ${err.response}`));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in to application</h2>

      <label>
        Username:
        <input
          type="text"
          name="Username"
          data-testid="username"
          autoComplete="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          name="Password"
          data-testid="password"
          autoComplete="current-password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
