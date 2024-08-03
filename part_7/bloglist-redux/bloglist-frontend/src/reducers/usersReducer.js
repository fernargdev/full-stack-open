import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    updateUser(state, action) {
      const updatedUser = action.payload;
      return state.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUser(users));
  };
};

export const updateUserDetails = (user) => {
  return async (dispatch) => {
    const updatedUser = await userService.getUser(user.id);
    dispatch(updateUser(updatedUser));
  };
};

export default userSlice.reducer;
