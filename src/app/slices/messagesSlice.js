import { createSlice } from '@reduxjs/toolkit';
import { fetchingDataSuccess } from './fetchData.js';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    newMessage: (state, action) => {
      state.push(action.payload);
    },
    clearMessages: () => {
      const newState = {
        text: 'Messages deleted', id: Math.random(), channelId: 1, username: 'admin',
      };
      return [newState];
    },
  },
  extraReducers: {
    [fetchingDataSuccess]: (state, { payload }) => [...payload.messages],
  },
});

export const actions = { ...slice.actions };

export default slice.reducer;
