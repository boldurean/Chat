/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import ApiProvider from './api/ApiProvider.jsx';
import E from './api/events.js';
import Component from './components/index.jsx';
import i18n from './locales';
import { actions } from './slices/index.js';
import createStore from './store.js';

export default (socket) => {
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

  return (
    <Provider store={store}>
      <ApiProvider socket={socket}>
        <I18nextProvider i18n={i18n}>
          <Component />
        </I18nextProvider>
      </ApiProvider>
    </Provider>
  );
};
