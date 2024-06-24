import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { createNotification } from './reducers/notificationReducer';
import { logoutUser, readUser } from './reducers/userReducer';
import { getAllUsers } from './reducers/usersReducer';

import { Routes, Route, Link } from 'react-router-dom';

// components
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';

// pages
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import UserDetailsPage from './pages/UserDetailsPage';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
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

          <Link to={'/'}>Home</Link>
          <br />
          <br />
          <Link to={'/users'}>Users</Link>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UserPage users={users} />} />
            <Route
              path="/users/:id"
              element={<UserDetailsPage users={users} />}
            />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
