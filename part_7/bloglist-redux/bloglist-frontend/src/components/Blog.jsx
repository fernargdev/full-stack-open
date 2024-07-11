import { Link } from 'react-router-dom';
import { Blog as BlogStyled } from '../styles/Components.styled';

const Blog = ({ blog }) => {
  return (
    <BlogStyled>
      <div>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} by {blog.author}
        </Link>
      </div>
    </BlogStyled>
  );
};

export default Blog;
