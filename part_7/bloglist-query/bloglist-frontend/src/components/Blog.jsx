import { useState } from 'react';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNotificationDispatch } from '../NotificationContext';
import blogService from '../services/blogs';

const Blog = ({ username, blog }) => {
  const updateBlog = blogService.update;
  const deleteBlog = blogService.eliminate;

  const [detailsVisible, setDetailsVisible] = useState(false);

  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  const updateBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      const updatedBlogs = blogs.map((blog) =>
        blog.id === newBlog.id ? newBlog : blog
      );
      queryClient.setQueryData(['blogs'], updatedBlogs);

      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `You add one like for ${newBlog.title}`,
      });
    },
    onError: (err) => {
      console.log(err);
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `Error: ${err.response.data.error}`,
      });
    },
  });

  const handleLike = async () => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };

    updateBlogMutation.mutate(newBlog);
  };

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      const currentBlogs = queryClient.getQueryData(['blogs']);
      const updatedBlogs = currentBlogs.filter((b) => b.id !== blog.id);
      queryClient.setQueryData(['blogs'], updatedBlogs);

      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `You deleted: ${blog.title}`,
      });
    },
    onError: (err) => {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `Error: ${err.response.data.error}`,
      });
    },
  });

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  return (
    <div className="blog">
      <div>
        <span>{blog.title} </span>
        <span>{blog.author} </span>
        <button onClick={toggleDetails}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </div>

      {detailsVisible && (
        <div>
          <a href={blog.url}>{blog.url}</a>

          <div>
            <span>likes {blog.likes}</span>
            <button onClick={handleLike}>like</button>
          </div>

          <span>{blog.user.name}</span>

          {blog.user.username === username && (
            <div>
              <button onClick={handleDelete}>remove</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
