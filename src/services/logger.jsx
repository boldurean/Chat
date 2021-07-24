import React, { createContext, useContext } from 'react';

const loggerContext = createContext({});

const LoggerProvider = ({ children, logger }) => {
  const { Provider } = loggerContext;
  return (
    <Provider value={logger}>
      {children}
    </Provider>
  );
};

const useLogger = () => useContext(loggerContext);

export {
  LoggerProvider,
  useLogger,
};
