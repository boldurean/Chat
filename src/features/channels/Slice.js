/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../init/index.js';

export const slice = createSlice({
  name: 'channels',
  initialState: {
    channelsList: [],
    currentChannelId: null,
  },
  reducers: {
    newChannel: (state, { payload }) => {
      state.channelsList.push(payload);
      state.currentChannelId = payload.id;
    },
    renameChannel: (state, action) => {
      const channel = state.channelsList.find((c) => c.id === action.payload.id);
      channel.name = action.payload.name;
    },
    removeChannel: (state, { payload }) => {
      state.channelsList = state.channelsList.filter((channel) => channel.id !== payload.id);
      state.currentChannelId = state.currentChannelId === payload.id ? 1 : state.currentChannelId;
    },
    switchChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  extraReducers: {
    [fetchData.fulfilled]: (state, { payload }) => {
      state.channelsList = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    },
  },
});

const getChannels = (state) => state.channels.channelsList;
const getCurrentChannelId = (state) => state.channels.currentChannelId;

const getChannelNames = createSelector(
  getChannels,
  (channelsList) => channelsList.map((c) => c.name),
);

const getCurrentChannelName = createSelector(
  getChannels,
  getCurrentChannelId,
  (channelsList, currentChannelId) => {
    const channel = channelsList.find((c) => c.id === currentChannelId);
    return channel?.name;
  },
);

export const channelsSelectors = {
  getChannels,
  getCurrentChannelId,
  getCurrentChannelName,
  getChannelNames,
};

export const { actions } = slice;
export default slice.reducer;
