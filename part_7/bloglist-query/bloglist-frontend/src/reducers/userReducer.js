import { createSlice } from '@reduxjs/toolkit';

import blogService from '../services/blogs';
import loginService from '../services/login';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const readUser = (json) => {
  return (dispatch) => {
    const user = JSON.parse(json);
    blogService.setToken(user.token);
    dispatch(setUser(user));
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
    } catch (err) {
      console.log(err);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(clearUser());
  };
};

export const { setUser, clearUser } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
