import { useSelector } from 'react-redux';

export default () => {
  const { channelsList, currentChannelId } = useSelector((state) => state.channels);
  const existingChannelNames = channelsList.map((c) => c.name);
  return {
    channelsList,
    currentChannelId,
    existingChannelNames,
  };
};
