import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    data: null,
  },
  reducers: {
    setNotification(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export const createNotification = (data, time = 2) => {
  return (dispatch) => {
    dispatch(setNotification(data));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, time * 1000);
  };
};

const notificationReducer = notificationSlice.reducer;

export default notificationReducer;
