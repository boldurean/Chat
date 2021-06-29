import { combineReducers } from '@reduxjs/toolkit';
import fetchChatData from './fetchData.js';
import channels, { actions as channelsActions } from './channelsSlice.js';
import messages, { actions as messagesActions } from './messagesSlice.js';
import currentChannelId, { actions as switchChannel } from './currentChannelIdSlice.js';

export const actions = {
  ...channelsActions,
  ...messagesActions,
  ...switchChannel,
};

export const asyncActions = {
  fetchChatData,
};

export default combineReducers({
  channels,
  messages,
  currentChannelId,
});
