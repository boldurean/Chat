import React from 'react';
import { useSelector } from 'react-redux';

const MessagesCounter = () => {
  const { channels, currentChannelId } = useSelector((state) => state);
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          {channels.reduce((acc, channel) => {
            if (channel.id === currentChannelId) {
              return acc + channel.name;
            }
            return acc;
          }, '# ')}
        </b>
      </p>
      <span className="text-muted">0 сообщений</span>
    </div>
  );
};

export default MessagesCounter;
