import { combineReducers } from '@reduxjs/toolkit';
import fetchChatData from './fetchData.js';
import channels, { actions as channelsActions } from './channelsSlice.js';
import messages, { actions as messagesActions } from './messagesSlice.js';

export const actions = {
  ...channelsActions,
  ...messagesActions,
};

export const asyncActions = {
  fetchChatData,
};

export default combineReducers({
  channels,
  messages,
});
