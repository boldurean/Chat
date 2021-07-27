/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';
import first from 'lodash/first.js';
import fetchData from '../init.js';

export const slice = createSlice({
  name: 'channels',
  initialState: {
    channelsList: [],
    currentChannelId: null,
  },
  reducers: {
    newChannel: (state, { payload }) => {
      state.channelsList.push(payload);
    },
    renameChannel: (state, action) => {
      const channel = state.channelsList.find((c) => c.id === action.payload.id);
      channel.name = action.payload.name;
    },
    removeChannel: (state, { payload }) => {
      state.channelsList = state.channelsList.filter((c) => c.id !== payload.id);
      if (state.currentChannelId === payload.id) {
        const generalChannel = first(state.channelsList);
        state.currentChannelId = generalChannel.id;
      }
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

export const selectors = {
  getChannels,
  getCurrentChannelId,
  getCurrentChannelName,
  getChannelNames,
};

export const { actions } = slice;
export default slice.reducer;
