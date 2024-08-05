import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/authReducer';
import { createNotification } from '../reducers/notificationReducer';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password))
      .then((user) => {
        dispatch(createNotification(`Logged in as ${user.username}`));
        setUsername('');
        setPassword('');
        navigate('/');
      })
      .catch((err) => {
        dispatch(createNotification(`Error: ${err.response.data.error}`));
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="Username"
          data-testid="username"
          autoComplete="username"
          required
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
          required
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
