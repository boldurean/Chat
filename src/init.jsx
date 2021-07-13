/* eslint-disable react/destructuring-assignment */
import i18next from 'i18next';
import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import { ApiProvider, events } from './services/api';
import { AuthProvider } from './services/auth';
import resources from './services/locales';
import App from './App.jsx';
import { channelsActions } from './features/channels';
import { messagesActions } from './features/chat';
import createStore from './store.js';

const init = (socket) => {
  const i18instance = i18next.createInstance();
  i18instance.use(initReactI18next).init({
    resources,
    lng: 'ru',
  });

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
        <I18nextProvider i18n={i18instance}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </I18nextProvider>
      </ApiProvider>
    </StoreProvider>
  );
};

export default init;
