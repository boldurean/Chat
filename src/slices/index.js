import { combineReducers } from '@reduxjs/toolkit';
import fetchChatData from './fetchData.js';
import channels, { actions as channelsActions } from './channels.js';
import messages, { actions as messagesActions } from './messages.js';

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
