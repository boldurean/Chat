import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import E from '../../client/events.js';
import socket from '../../client/socket.js';
import { actions } from '../../app/slices';

const MessagesBox = () => {
  const dispatch = useDispatch();
  const { newMessage } = actions;
  const [data, setData] = useState({});
  const { messages, currentChannelId } = useSelector((state) => state);

  const currentChannelMessages = messages.filter((msg) => msg.channelId === currentChannelId);

  socket.on(E.NEW_MESSAGE, (arg) => {
    console.log(arg);
    setData(arg);
  });

  useEffect(() => {
    dispatch(newMessage(data));
  }, [data]);

  return (
    <div id="message-box" className="chat-messages overflow-auto px-5 ">
      {currentChannelMessages.length > 0 && currentChannelMessages.map((msg) => (
        <div key={msg.id} className="text-break mb-2">
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default MessagesBox;
