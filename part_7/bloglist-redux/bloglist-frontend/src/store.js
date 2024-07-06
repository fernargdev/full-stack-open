import { configureStore } from '@reduxjs/toolkit';

// reducers
import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';

import authReducer from './reducers/authReducer';
import usersReducer from './reducers/usersReducer';

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer,
    auth: authReducer,
    users: usersReducer,
  },
});

// store.subscribe(() => {
//   console.log(store.getState());
// });

export default store;
