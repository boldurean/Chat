import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../init/index.js';
import { actions as channelsSliceActions, channelsSelectors } from '../channels/Slice.js';

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
const { getCurrentChannelId } = channelsSelectors;

const getCurrentChannelMessages = createSelector(
  getMessages,
  getCurrentChannelId,
  (messages, currentChannelId) => messages.filter((msg) => msg.channelId === currentChannelId),
);

export const messageSelectors = {
  getMessages,
  getCurrentChannelMessages,
};

export const { actions } = slice;

export default slice.reducer;
