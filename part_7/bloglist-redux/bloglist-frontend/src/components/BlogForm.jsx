import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createBlog } from '../reducers/blogReducer';
import { createNotification } from '../reducers/notificationReducer';

import {
  BlogForm as BlogFormStyled,
  FormButton,
} from '../styles/Components.styled';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    try {
      dispatch(createBlog(newBlog));
      dispatch(
        createNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`
        )
      );

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (err) {
      dispatch(createNotification(`Error: ${err.response.data.error}`));
    }
  };

  return (
    // <div className="blogForm-container">
    <BlogFormStyled onSubmit={handleSubmit}>
      <h2>Create new blog</h2>
      <label>
        Title:
        <input
          type="text"
          name="Title"
          data-testid="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          name="Author"
          data-testid="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </label>
      <label>
        Url:
        <input
          type="url"
          name="Url"
          data-testid="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </label>
      <FormButton type="submit">Create</FormButton>
    </BlogFormStyled>
  );
};

export default BlogForm;
