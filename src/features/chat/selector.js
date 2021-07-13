import { useSelector } from 'react-redux';
import channelsSelector from '../channels/selector.js';

export default () => {
  const { currentChannelId } = channelsSelector();
  const { messages } = useSelector((state) => state);
  const currentChannelMessages = messages.filter((msg) => msg.channelId === currentChannelId);
  const count = messages.filter((m) => m.channelId === currentChannelId).length;
  return {
    messages,
    currentChannelMessages,
    count,
  };
};
