/* eslint-disable react/destructuring-assignment */
import i18next from 'i18next';
import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import Rollbar from 'rollbar';
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

  yup.setLocale({
    mixed: {
      required: i18n.t('errors.required'),
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

  const startLogger = () => new Rollbar({
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  });

  const currentLogger = (process.env.NODE_ENV === 'production')
    ? startLogger()
    : console;

  return (
    <StoreProvider store={store}>
      <ApiProvider socket={socket}>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <LoggerProvider logger={currentLogger}>
              <App />
            </LoggerProvider>
          </AuthProvider>
        </I18nextProvider>
      </ApiProvider>
    </StoreProvider>
  );
};

export default init;
