import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { updateUserDetails } from './usersReducer';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    data: [],
  },
  reducers: {
    setBlog(state, action) {
      state.data = action.payload;
    },
    addBlog(state, action) {
      state.data = state.data.concat(action.payload);
    },
    removeBlog(state, action) {
      state.data = state.data.filter((b) => b.id !== action.payload);
    },
  },
});

export const { setBlog, addBlog, removeBlog } = blogSlice.actions;

export const getAllBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlog(blogs));
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(newBlog);
    dispatch(addBlog(createdBlog));
    dispatch(updateUserDetails(createdBlog.user));
  };
};

export const updateBlog = (newBlog) => {
  return async (dispatch) => {
    const id = newBlog.id;
    const blogs = await blogService.getAll();
    const updatedBlog = await blogService.update(newBlog);
    const newBlogs = blogs.map((b) => (b.id !== id ? b : updatedBlog));
    dispatch(setBlog(newBlogs));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.eliminate(id);
    dispatch(removeBlog(deletedBlog.id));
  };
};

const blogReducer = blogSlice.reducer;

export default blogReducer;
