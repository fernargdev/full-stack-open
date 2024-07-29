// import { Link, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Nav } from '../styles/Components.styled';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../reducers/authReducer';
import { createNotification } from '../reducers/notificationReducer';

const Navigation = () => {
  const dispatch = useDispatch();
  const authUsers = useSelector((state) => state.auth.user);
  // const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      dispatch(createNotification('Logged out'));
      // navigate('/login');
    } catch (err) {
      console.log(err);
      dispatch(createNotification(`Error: ${err.response}`));
    }
  };

  return (
    <header>
      <h1>Blog App</h1>

      {authUsers === null ? (
        <h2>Log in to application</h2>
      ) : (
        <section>
          <div>
            <span>{authUsers.name} logged in </span>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <Nav>
            <Link to={'/'}>Home</Link>
            <Link to={'/blogs'}>Blogs</Link>
            <Link to={'/users'}>Users</Link>
          </Nav>
        </section>
      )}
    </header>
  );
};

export default Navigation;
