import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { initializeComments } from '../reducers/commentReducer';
import CommentForm from './CommentForm';
import { CommentList, Comment } from '../styles/Components.styled';

const BlogComments = ({ id }) => {
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
    <div>
      <CommentForm id={id} />

      <CommentList>
        {comments.map((c) => (
          <Comment key={c.id}>{c.content}</Comment>
        ))}
      </CommentList>
    </div>
  );
};

export default BlogComments;
