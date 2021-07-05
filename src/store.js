import { configureStore } from '@reduxjs/toolkit';
import reducer from './slices/index.js';

export default () =>
  configureStore({
    reducer,
  });
