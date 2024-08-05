import { useSelector } from 'react-redux';

import Blog from '../components/Blog';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs.data);

  return (
    <div>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default BlogList;
