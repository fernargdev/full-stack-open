import { configureStore } from '@reduxjs/toolkit';

import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import authReducer from './reducers/authReducer';
import usersReducer from './reducers/usersReducer';
import commentReducer from './reducers/commentReducer';

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer,
    auth: authReducer,
    users: usersReducer,
    comments: commentReducer,
  },
});

export default store;
