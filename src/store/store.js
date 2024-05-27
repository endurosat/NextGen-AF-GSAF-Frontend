// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import toastReducer from './reducers/toastReducer';

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    user: userReducer,
  },
});
