import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../slices/index.js';
import socket from '../../api/socket.js';
import apiContext from '../../contexts/apiContext.js';
import E from '../../api/events.js';

const ApiProvider = ({ children, hideModal }) => {
  const { switchChannel } = actions;
  const dispatch = useDispatch();

  const addChannel = (values) => {
    socket.volatile.emit(E.NEW_CHANNEL, values, (response) => {
      if (!response.status) throw new Error('network offline');
      if (response.status === 'ok') {
        const { id } = response.data;
        dispatch(switchChannel(id));
        hideModal();
      }
    });
  };

  const removeChannel = (values) => {
    socket.volatile.emit(E.REMOVE_CHANNEL, values, (response) => {
      if (!response.status) throw new Error('network offline');
      if (response.status === 'ok') {
        hideModal();
      }
    });
  };

  const renameChannel = (values) => {
    socket.volatile.emit(E.RENAME_CHANNEL, values, (response) => {
      if (!response.status) throw new Error('network offline');
      if (response.status === 'ok') {
        hideModal();
      }
    });
  };

  const newMessage = (values, resetForm) => {
    socket.volatile.emit(E.NEW_MESSAGE, values, (response) => {
      if (response.status === 'ok') {
        resetForm();
      } else {
        throw new Error('Network problems');
      }
    });
  };

  return (
    <apiContext.Provider
      value={{
        addChannel,
        removeChannel,
        renameChannel,
        newMessage,
      }}
    >
      {children}
    </apiContext.Provider>
  );
};

export default ApiProvider;
