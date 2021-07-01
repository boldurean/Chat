// @ts-check
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import E from './client/events.js';
import socket from './client/socket.js';
import App from './components/App.jsx';
import store from './app/store.js';
import { actions } from './app/slices';

const { newMessage, clearMessages } = actions;

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

socket.on(E.NEW_MESSAGE, (data) => {
  store.dispatch(newMessage(data));
});

socket.on(E.DELETE_MESSAGES, (data) => {
  console.log(data);
  store.dispatch(clearMessages());
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);

console.log('it works!');
