import io from 'socket.io-client';
import store from '../app/store.js';
import { actions } from '../app/slices/index.js';
import E from './events.js';

const URL = window.location.host;
const socket = io.connect(URL);

const { newMessage, clearMessages } = actions;

socket.on(E.NEW_MESSAGE, (data) => {
  store.dispatch(newMessage(data));
});

socket.on(E.DELETE_MESSAGES, (data) => {
  console.log(data);
  store.dispatch(clearMessages());
});

export default socket;
