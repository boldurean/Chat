import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { fetchingDataSuccess } from './fetchData.js';

export const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    newChannel: (state, { name }) => state.push({ id: _.uniqueId(), name, removable: true }),
    renameChannel: (state, { id, name }) => state.map((channel) => {
      if (channel.id === id) {
        return { ...channel, name };
      }
      return channel;
    }),
    removeChannel: (state, { id }) => state
      .filter((channel) => channel.removable === true)
      .filter((channel) => channel.id !== id),
  },
  extraReducers: {
    [fetchingDataSuccess]: (state, { payload }) => [...state, ...payload.channels],
  },
});

export const actions = { ...slice.actions };
export default slice.reducer;
