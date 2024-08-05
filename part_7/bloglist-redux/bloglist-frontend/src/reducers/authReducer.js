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

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

export const loginUser = (username, password) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      loginService
        .login({
          username,
          password,
        })
        .then((user) => {
          window.localStorage.setItem(
            'loggedBlogappUser',
            JSON.stringify(user)
          );
          blogService.setToken(user.token);
          dispatch(setUser(user));
          resolve(user);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
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
