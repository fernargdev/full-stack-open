import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
  },
  reducers: {
    setNotification(state, action) {
      state.message = action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export const createNotification = (message, time = 2) => {
  return (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(setNotification(''));
    }, time * 1000);
  };
};

const notificationReducer = notificationSlice.reducer;

export default notificationReducer;
