import { createSlice } from '@reduxjs/toolkit';
import { fetchingDataSuccess } from './fetchData.js';

const slice = createSlice({
  name: 'currentChannelId',
  initialState: 1,
  reducers: {
    switchChannel: (state, action) => action.payload,
  },
  extraReducers: {
    [fetchingDataSuccess]: (state, { payload }) => payload.currentChannelId,
  },
});

export const actions = { ...slice.actions };

export default slice.reducer;
