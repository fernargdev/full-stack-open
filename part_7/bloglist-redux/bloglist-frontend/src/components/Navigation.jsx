import { Link } from 'react-router-dom';
import { Nav } from '../styles/Components.styled';

const Navigation = ({ user, handleLogout }) => {
  return (
    <header>
      <section>
        <h1>Blog App</h1>

        <div>
          <span>{user.name} logged in </span>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>

      <Nav>
        <div className="link">
          <Link to={'/'}>Home</Link>
        </div>

        <div className="link">
          <Link to={'/blogs'}>Blogs</Link>
        </div>

        <div className="link">
          <Link to={'/users'}>Users</Link>
        </div>
      </Nav>
    </header>
  );
};

export default Navigation;
