import { createSlice } from '@reduxjs/toolkit';
import { fetchingDataSuccess } from './fetchData.js';

export const slice = createSlice({
  name: 'channels',
  initialState: {
    channelsList: [],
    currentChannelId: 1,
  },
  reducers: {
    newChannel: (state, action) => {
      const channelsList = [...state.channelsList, action.payload];
      return { ...state, channelsList };
    },
    renameChannel: (state, action) => {
      const channel = state.channelsList.find((c) => c.id === action.payload.id);
      channel.name = action.payload.name;
      return { ...state };
    },
    removeChannel: (state, { payload }) => {
      const channelsList = state.channelsList.filter((channel) => channel.id !== payload.id);
      if (state.currentChannelId === payload.id) {
        return {
          channelsList,
          currentChannelId: 1,
        };
      }
      return { ...state, channelsList };
    },
    switchChannel: (state, action) => ({ ...state, currentChannelId: action.payload }),
  },
  extraReducers: {
    [fetchingDataSuccess]: (state, { payload }) => ({
      ...state,
      channelsList: payload.channels,
    }),
  },
});

export const actions = { ...slice.actions };
export default slice.reducer;
