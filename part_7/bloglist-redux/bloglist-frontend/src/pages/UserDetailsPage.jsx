import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  UserDetails,
  Username,
  BlogHeader,
  BlogsList,
  BlogItem,
} from '../styles/Components.styled';

const UserDetailsPage = () => {
  const users = useSelector((state) => state.users);

  const id = useParams().id;
  const user = users.find((u) => u.id === String(id));
  if (!user) {
    return null;
  }

  return (
    <UserDetails>
      <Username>{user.username}</Username>
      <BlogHeader>Added blogs:</BlogHeader>
      <BlogsList>
        {user.blogs.map((blog) => (
          <BlogItem key={blog.id}>{blog.title}</BlogItem>
        ))}
      </BlogsList>
    </UserDetails>
  );
};

export default UserDetailsPage;
