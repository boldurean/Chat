import React, { createContext, useContext } from 'react';

const apiContext = createContext({});

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

const ApiProvider = ({ children, socket }) => {
  const { Provider } = apiContext;

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

const host = '';
const prefix = 'api/v1';

const routes = {
  chatPath: '/',
  loginPath: () => [host, prefix, 'login'].join('/'),
  signupPath: () => [host, prefix, 'signup'].join('/'),
  dataPath: () => [host, prefix, 'data'].join('/'),
};

export {
  ApiProvider,
  useAPI,
  events,
  routes,
};
