import React from 'react';
import { useSelector } from 'react-redux';
import socket from '../../api/socket.js';
import E from '../../api/events.js';

const MessagesCounter = () => {
  const { username } = JSON.parse(localStorage.getItem('userId'));

  const AdminButton = () => {
    if (username !== 'admin') return null;
    return (
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => socket.emit(E.DELETE_MESSAGES)}
      >
        delete messages
      </button>
    );
  };

  const { channelsList, currentChannelId } = useSelector((state) => state.channels);
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small d-flex justify-content-between">
      <div>
        <p className="m-0">
          <b>
            {channelsList.reduce((acc, channel) => {
              if (channel.id === currentChannelId) {
                return acc + channel.name;
              }
              return acc;
            }, '# ')}
          </b>
        </p>
        <span className="text-muted">0 сообщений</span>
      </div>
      <div>
        <AdminButton />
      </div>
    </div>
  );
};

export default MessagesCounter;
