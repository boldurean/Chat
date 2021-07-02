import io from 'socket.io-client';
import store from '../app/store.js';
import { actions } from '../app/slices/index.js';
import E from './events.js';

const URL = window.location.host;
const socket = io.connect(URL);

const {
  newMessage, newChannel, removeChannel, renameChannel, clearMessages, switchChannel,
} = actions;

socket.on(E.NEW_MESSAGE, (data) => {
  store.dispatch(newMessage(data));
});

socket.on(E.DELETE_MESSAGES, (data) => {
  console.log(data);
  store.dispatch(clearMessages());
});

socket.on(E.NEW_CHANNEL, (data) => {
  store.dispatch(newChannel(data));
});

socket.on(E.REMOVE_CHANNEL, (data) => {
  store.dispatch(removeChannel(data));
  store.dispatch(switchChannel(1));
});

socket.on(E.RENAME_CHANNEL, (data) => {
  store.dispatch(renameChannel(data));
});

export default socket;
