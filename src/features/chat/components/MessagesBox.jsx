import React from 'react';
import messagesSelector from '../selector.js';

const MessagesBox = () => {
  const { currentChannelMessages } = messagesSelector();

  return (
    <div id="message-box" className="chat-messages overflow-auto px-5 ">
      {currentChannelMessages.length > 0
        && currentChannelMessages.map((msg) => (
          <div key={msg.id} className="text-break mb-2">
            <b>{`${msg.username}: `}</b>
            {msg.text}
          </div>
        ))}
    </div>
  );
};

export default MessagesBox;
