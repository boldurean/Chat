import React, { createContext, useContext } from 'react';

const apiContext = createContext({});

const ApiProvider = ({ children, socket }) => {
  const { Provider } = apiContext;

  const withAcknowledgement = (socketFunc) => (...args) => new Promise((resolve, reject) => {
    // eslint-disable-next-line functional/no-let
    let state = 'pending';
    const error = new Error('Network error');

    const timer = setTimeout(() => {
      state = 'rejected';
      reject(error);
    }, 3000);

    socketFunc(...args, (response) => {
      if (state !== 'pending') return;

      clearTimeout(timer);

      if (response.status === 'ok') {
        state = 'resolved';
        resolve(response.data);
      }
      reject(error);
    });
  });

  return (
    <Provider
      value={{
        newChannel: withAcknowledgement((...args) => socket.volatile.emit('newChannel', ...args)),
        renameChannel: withAcknowledgement((...args) => socket.volatile.emit('renameChannel', ...args)),
        removeChannel: withAcknowledgement((...args) => socket.volatile.emit('removeChannel', ...args)),
        newMessage: withAcknowledgement((...args) => socket.volatile.emit('newMessage', ...args)),
      }}
    >
      {children}
    </Provider>
  );
};

const useAPI = () => useContext(apiContext);

const events = {
  NEW_MESSAGE: 'newMessage',
  NEW_CHANNEL: 'newChannel',
  RENAME_CHANNEL: 'renameChannel',
  REMOVE_CHANNEL: 'removeChannel',
};

export { default as routes } from './routes.js';
export {
  ApiProvider,
  useAPI,
  events,
};
