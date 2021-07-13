/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../init/index.js';

export const slice = createSlice({
  name: 'channels',
  initialState: {
    channelsList: [],
    currentChannelId: 1,
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
      state.currentChannelId = 1;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
