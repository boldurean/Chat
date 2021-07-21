import React, { createContext, useContext } from 'react';
import Rollbar from 'rollbar';

const loggerContext = createContext({});

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
  enabled: process.env.NODE_ENV === 'production',
});

const currentLogger = (process.env.NODE_ENV === 'production')
  ? rollbar
  : console;

const LoggerProvider = ({ children }) => {
  const { Provider } = loggerContext;
  return (
    <Provider value={currentLogger}>
      {children}
    </Provider>
  );
};

const useLogger = () => useContext(loggerContext);

export {
  LoggerProvider,
  useLogger,
};
