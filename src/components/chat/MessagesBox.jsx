import React from 'react';
import { useSelector } from 'react-redux';

const MessagesBox = () => {
  const { messages } = useSelector((state) => state);
  return (
    <div id="message-box" className="chat-messages overflow-auto px-5 ">
      message box
      {messages}
    </div>
  );
};

export default MessagesBox;
