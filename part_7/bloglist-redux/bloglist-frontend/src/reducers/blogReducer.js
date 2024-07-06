import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
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
  },
});

export const { setBlog, addBlog } = blogSlice.actions;

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(addBlog(newBlog));
  };
};

export const readBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlog(blogs));
  };
};

export const updateBlog = (id, blog) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const updatedBlog = await blogService.update(id, blog);
    dispatch(
      setBlog(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
    );
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    const blogs = await blogService.getAll();
    dispatch(setBlog(blogs));
  };
};

const blogsReducer = blogSlice.reducer;

export default blogsReducer;
