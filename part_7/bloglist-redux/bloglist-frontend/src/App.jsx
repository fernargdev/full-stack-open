import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

// reducers
import { getAllBlog } from './reducers/blogReducer';
import { createNotification } from './reducers/notificationReducer';
import { initializeUser, logoutUser } from './reducers/authReducer';
import { getAllUsers } from './reducers/usersReducer';

// components
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';

// pages
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import UserDetailsPage from './pages/UserDetailsPage';
import BlogsDetailsPage from './pages/BlogsDetailsPage';

import Navigation from './components/Navigation';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(getAllUsers());
    dispatch(getAllBlog());
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
      <h1>Blog App</h1>

      <Notification />

      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Navigation user={user} handleLogout={handleLogout} />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/users/:id" element={<UserDetailsPage />} />
            <Route path="/blogs/:id" element={<BlogsDetailsPage />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
