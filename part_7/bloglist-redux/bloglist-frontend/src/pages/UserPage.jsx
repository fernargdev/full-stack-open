import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { UserList, UsersData, Row, Cell } from '../styles/Components.styled';

const UserPage = () => {
  const users = useSelector((state) => state.users);

  return (
    <UserList>
      <h2>Users List:</h2>

      <UsersData>
        <Row>
          <Cell>Username</Cell>
          <Cell>Blogs created</Cell>
        </Row>

        <div>
          {users.map((u) => (
            <Row key={u.id}>
              <Cell>
                <Link to={`/users/${u.id}`}>{u.username}</Link>
              </Cell>
              <Cell>{u.blogs.length}</Cell>
            </Row>
          ))}
        </div>
      </UsersData>
    </UserList>
  );
};

export default UserPage;
