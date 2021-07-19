import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { messageSelectors } from '../Slice.js';

const MessagesBox = () => {
  const currentChannelMessages = useSelector(messageSelectors.getCurrentChannelMessages);

  const messagesEndRef = useRef();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChannelMessages]);

  return (
    <div id="message-box" className="chat-messages overflow-auto px-5 ">
      {currentChannelMessages
        && currentChannelMessages.map((msg) => (
          <div key={msg.id} className="text-break mb-2">
            <b>{`${msg.username}: `}</b>
            {msg.text}
          </div>
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesBox;
