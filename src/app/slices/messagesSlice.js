import { createSlice } from '@reduxjs/toolkit';
import { fetchingDataSuccess } from './fetchData.js';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    newMessage: (state, { payload }) => state.push(payload.message),
  },
  extraReducers: {
    [fetchingDataSuccess]: (state, { payload }) => [...payload.messages],
  },
});

export const actions = { ...slice.actions };

export default slice.reducer;
