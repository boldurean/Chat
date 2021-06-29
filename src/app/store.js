import { configureStore } from '@reduxjs/toolkit';
import reducer from './slices/index.js';

const store = configureStore({
  reducer,
});

export default store;
