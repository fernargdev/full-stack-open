import { useState } from 'react';

// react-redux
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';
// import { createNotification } from '../reducers/notificationReducer';

// react-query
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNotificationDispatch } from '../NotificationContext';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  // react-redux
  const dispatch = useDispatch();

  // react-query
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    try {
      dispatch(createBlog(newBlog));
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      });

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (err) {
      // dispatch(createNotification(`Error: ${err.response.data.error}`));
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `Error: ${err.response.data.error}`,
      });
    }
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
