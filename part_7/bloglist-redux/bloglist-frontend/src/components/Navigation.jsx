import { Link } from 'react-router-dom';

const Navigation = ({ user, handleLogout }) => {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <Link to={'/'}>Home</Link>
            </td>

            <td>
              <Link to={'/blogs'}>Blogs</Link>
            </td>
            <td>
              <Link to={'/users'}>Users</Link>
            </td>

            <td>
              <p>
                {user.name} logged in
                <button type="button" onClick={handleLogout}>
                  logout
                </button>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Navigation;
