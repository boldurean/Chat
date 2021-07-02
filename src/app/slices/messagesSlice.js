import { createSlice } from '@reduxjs/toolkit';
import { fetchingDataSuccess } from './fetchData.js';
import { actions as channelsSliceActions } from './channelsSlice.js';

const { removeChannel } = channelsSliceActions;

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
    [removeChannel]: (state, action) => state
      .filter((message) => message.channelId !== action.payload.id),
  },
});

export const actions = { ...slice.actions };

export default slice.reducer;
