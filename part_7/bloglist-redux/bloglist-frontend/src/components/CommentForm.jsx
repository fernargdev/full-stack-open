import { useDispatch } from 'react-redux';
import { createComment } from '../reducers/commentReducer';
import { createNotification } from '../reducers/notificationReducer';

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
    <div>
      <form onSubmit={addComment}>
        <input type="text" name="newCommetInput" />
        <button type="submit">Add comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
