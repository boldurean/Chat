import { createSelector, createSlice } from '@reduxjs/toolkit';
import fetchData from '../init.js';
import { actions as channelsSliceActions, selectors as channelSelectors } from '../channels/Slice.js';

const { removeChannel } = channelsSliceActions;

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    newMessage: (state, action) => [...state, action.payload],
  },
  extraReducers: {
    [fetchData.fulfilled]: (state, { payload }) => payload.messages,
    [removeChannel]: (state, action) => state
      .filter((message) => message.channelId !== action.payload.id),
  },
});

const getMessages = (state) => state.messages;
const { getCurrentChannelId } = channelSelectors;

const getCurrentChannelMessages = createSelector(
  getMessages,
  getCurrentChannelId,
  (messages, currentChannelId) => messages.filter((msg) => msg.channelId === currentChannelId),
);

export const selectors = {
  getMessages,
  getCurrentChannelMessages,
};

export const { actions } = slice;

export default slice.reducer;
