import { createSlice } from '@reduxjs/toolkit';
import { fetchingDataSuccess } from './fetchData.js';

export const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    newChannel: (state, action) => [...state, action.payload],
    renameChannel: (state, action) => {
      const channel = state.find((c) => c.id === action.payload.id);
      channel.name = action.payload.name;
      return state;
    },
    removeChannel: (state, action) => state
      .filter((channel) => channel.id !== action.payload.id),
  },
  extraReducers: {
    [fetchingDataSuccess]: (state, { payload }) => payload.channels,
  },
});

export const actions = { ...slice.actions };
export default slice.reducer;
