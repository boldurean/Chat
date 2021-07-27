import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../../channels';
import { selectors } from '../Slice.js';

const MessagesBox = () => {
  const currentChannelMessages = useSelector(selectors.getCurrentChannelMessages);
  const currentChannelId = useSelector(channelsSelectors.getCurrentChannelId);

  const messageBoxRef = useRef();

  const scrollToBottom = (node) => {
    // eslint-disable-next-line no-param-reassign
    node.scrollTop = node.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom(messageBoxRef.current);
  }, [currentChannelId, currentChannelMessages]);

  return (
    <div ref={messageBoxRef} id="message-box" className="chat-messages overflow-auto px-5 ">
      {currentChannelMessages.map((msg) => (
        <div key={msg.id} className="text-break mb-2">
          <b>{`${msg.username}: `}</b>
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default MessagesBox;
