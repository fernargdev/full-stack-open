import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const commentSlice = createSlice({
  name: 'comments',
  initialState: null,
  reducers: {
    appendComment(state, action) {
      state.push(action.payload);
    },
    setComments(state, action) {
      return action.payload;
    },
  },
});

export const { appendComment, setComments } = commentSlice.actions;

export const initializeComments = (id) => {
  return async (dispatch) => {
    const comments = await blogService.getComments(id);
    dispatch(setComments(comments));
  };
};

export const createComment = (id, content) => {
  return async (dispatch) => {
    const newComment = await blogService.createComment(id, content);
    dispatch(appendComment(newComment));
  };
};

export default commentSlice.reducer;
