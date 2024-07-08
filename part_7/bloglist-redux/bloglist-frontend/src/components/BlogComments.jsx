import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { initializeComments } from '../reducers/commentReducer';

const BlogComments = ({ id }) => {
  const commentStyle = {
    fontSize: '14px',
    margin: '5px 20px',
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeComments(id));
  }, [dispatch, id]);

  const comments = useSelector((state) => state.comments);

  if (!comments) {
    return null;
  }

  //   console.log(comments);

  return (
    <h3>
      comments
      {comments.map((c) => (
        <li key={c.id} style={commentStyle}>
          {c.content}
        </li>
      ))}
    </h3>
  );
};

export default BlogComments;
