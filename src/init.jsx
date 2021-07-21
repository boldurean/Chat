/* eslint-disable react/destructuring-assignment */
import i18next from 'i18next';
import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import * as yup from 'yup';
import { ApiProvider, events } from './services/api.jsx';
import { AuthProvider } from './services/auth.jsx';
import resources from './locales';
import App from './App.jsx';
import { channelsActions } from './features/channels';
import { messagesActions } from './features/chat';
import { LoggerProvider } from './services/logger.jsx';
import createStore from './store.js';

const init = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
  });
  await yup.setLocale({
    mixed: {
      required: i18n.t('errors.required'),
    },
    string: {
      min: ({ min }) => i18n.t('errors.fromTo', { min, max: 20 }),
      max: ({ max }) => i18n.t('errors.fromTo', { min: 3, max }),
    },
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
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <LoggerProvider>
              <App />
            </LoggerProvider>
          </AuthProvider>
        </I18nextProvider>
      </ApiProvider>
    </StoreProvider>
  );
};

export default init;
