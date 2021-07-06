import React from 'react';
import { render } from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import E from './api/events.js';
import socket from './api/socket.js';
import App from './components/App.jsx';
import i18n from './locales';
import { actions } from './slices/index.js';
import createStore from './store.js';

export default () => {
  const store = createStore();

  const {
    newMessage, newChannel, removeChannel, renameChannel, clearMessages,
  } = actions;

  socket.on(E.NEW_MESSAGE, (data) => {
    store.dispatch(newMessage(data));
  });

  socket.on(E.DELETE_MESSAGES, (data) => {
    console.log(data);
    store.dispatch(clearMessages());
  });

  socket.on(E.NEW_CHANNEL, (data) => {
    console.log(data);
    store.dispatch(newChannel(data));
  });

  socket.on(E.REMOVE_CHANNEL, (data) => {
    store.dispatch(removeChannel(data));
  });

  socket.on(E.RENAME_CHANNEL, (data) => {
    store.dispatch(renameChannel(data));
  });

  render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>,
    document.getElementById('chat'),
  );
};
