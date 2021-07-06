import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import E from './api/events.js';
import socket from './api/socket.js';
import App from './components';
import i18n from './locales';
import { actions } from './slices/index.js';
import createStore from './store.js';

export default () => {
  const store = createStore();

  const {
    newMessage, newChannel, removeChannel, renameChannel,
  } = actions;

  socket.on(E.NEW_MESSAGE, (data) => {
    store.dispatch(newMessage(data));
  });

  socket.on(E.NEW_CHANNEL, (data) => {
    store.dispatch(newChannel(data));
  });

  socket.on(E.REMOVE_CHANNEL, (data) => {
    store.dispatch(removeChannel(data));
  });

  socket.on(E.RENAME_CHANNEL, (data) => {
    store.dispatch(renameChannel(data));
  });

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
};
