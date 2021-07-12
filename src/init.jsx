/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import { ApiProvider, events } from './services/api';
import App from './App.jsx';
import i18n from './services/locales';
import { channelsActions } from './features/channels';
import { messagesActions } from './features/chat';
import createStore from './store.js';

const Init = (socket) => {
  const store = createStore();

  const {
    newChannel, removeChannel, renameChannel,
  } = channelsActions;
  const { newMessage } = messagesActions;

  socket.on(events.NEW_MESSAGE, (data) => {
    store.dispatch(newMessage(data));
  });

  socket.on(events.NEW_CHANNEL, (data) => {
    store.dispatch(newChannel(data));
  });

  socket.on(events.REMOVE_CHANNEL, (data) => {
    store.dispatch(removeChannel(data));
  });

  socket.on(events.RENAME_CHANNEL, (data) => {
    store.dispatch(renameChannel(data));
  });

  return (
    <StoreProvider store={store}>
      <ApiProvider socket={socket}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ApiProvider>
    </StoreProvider>
  );
};

export default Init;
