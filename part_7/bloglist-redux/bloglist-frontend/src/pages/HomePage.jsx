import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { readBlog } from '../reducers/blogsReducer';

import Togglable from '../components/Togglable';
import BlogForm from '../components/BlogForm';
import Blog from '../components/Blog';

const HomePage = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.data);
  const user = useSelector((state) => state.user.user);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(readBlog());
  }, [dispatch]);

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} username={user.username} />
        ))}
    </div>
  );
};

export default HomePage;
