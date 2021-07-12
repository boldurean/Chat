import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { channelsReducer } from './features/channels/index.js';
import { messagesReducer } from './features/chat/index.js';

const rootReducer = combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
});

export default () => configureStore({
  reducer: rootReducer,
});
