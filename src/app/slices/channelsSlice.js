import { createSlice } from '@reduxjs/toolkit';
import { fetchingDataSuccess } from './fetchData.js';

export const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    newChannel: (state, action) => state.push(action.payload),
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
    [fetchingDataSuccess]: (state, { payload }) => payload.channels,
  },
});

export const actions = { ...slice.actions };
export default slice.reducer;
