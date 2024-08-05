import { useDispatch } from 'react-redux';
import { createComment } from '../reducers/commentReducer';
import { createNotification } from '../reducers/notificationReducer';
import { CommentInput } from '../styles/Components.styled';

const CommentForm = ({ id }) => {
  const dispatch = useDispatch();

  const addComment = (e) => {
    e.preventDefault();

    const comment = e.target.newCommetInput.value;

    try {
      dispatch(createComment(id, comment));
      e.target.newCommetInput.value = '';
    } catch (err) {
      dispatch(createNotification(`Error: ${err.response.data.error}`));
    }
  };

  return (
    <section>
      <h3>Comments: </h3>
      <form onSubmit={addComment}>
        <CommentInput
          type="text"
          name="newCommetInput"
          data-testid="comment-input"
        />
        <button type="submit">Add comment</button>
      </form>
    </section>
  );
};

export default CommentForm;
