import React from 'react';
import apiContext from '../../contexts/apiContext.js';

const ApiProvider = ({ children, socket }) => {
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
    <apiContext.Provider
      value={{
        newChannel: withAcknowledgement((...args) => socket.volatile.emit('newChannel', ...args)),
        renameChannel: withAcknowledgement((...args) => socket.volatile.emit('renameChannel', ...args)),
        removeChannel: withAcknowledgement((...args) => socket.volatile.emit('removeChannel', ...args)),
        newMessage: withAcknowledgement((...args) => socket.volatile.emit('newMessage', ...args)),
      }}
    >
      {children}
    </apiContext.Provider>
  );
};

export default ApiProvider;
