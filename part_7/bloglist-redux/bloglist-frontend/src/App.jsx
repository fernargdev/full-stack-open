// dependencies
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

// reducers
import { getAllBlog } from './reducers/blogReducer';
import { initializeUser } from './reducers/authReducer';
import { getAllUsers } from './reducers/usersReducer';

// components
import Notification from './components/Notification';
import Header from './components/Header';
import LoginForm from './components/LoginForm';

// pages
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import UserDetailsPage from './pages/UserDetailsPage';
import BlogsDetailsPage from './pages/BlogsDetailsPage';
import BlogPage from './pages/BlogPage';

const App = () => {
  const dispatch = useDispatch();
  const authUsers = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (!authUsers && !loggedUserJSON) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUsers]);

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(getAllUsers());
    dispatch(getAllBlog());
  }, [dispatch]);

  return (
    <>
      <Notification />
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/blogs/:id" element={<BlogsDetailsPage />} />
          <Route path="/users/:id" element={<UserDetailsPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
