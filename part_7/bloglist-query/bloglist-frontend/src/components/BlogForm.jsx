import { useState } from 'react';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNotificationDispatch } from '../NotificationContext';
import blogService from '../services/blogs';

const BlogForm = ({ blogFormRef }) => {
  const createBlog = blogService.create;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      });
    },
    onError: (err) => {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `Error: ${err.response.data.error}`,
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    setTitle('');
    setAuthor('');
    setUrl('');

    newBlogMutation.mutate(newBlog);

    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            name="Title"
            data-testid="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            name="Author"
            data-testid="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="url"
            name="Url"
            data-testid="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
