import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUser(users));
  };
};

export default userSlice.reducer;
