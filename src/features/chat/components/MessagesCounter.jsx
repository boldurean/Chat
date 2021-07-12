import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const MessagesCounter = () => {
  const { t } = useTranslation();

  const {
    channels: { channelsList, currentChannelId },
    messages,
  } = useSelector((state) => state);
  const count = messages.filter((m) => m.channelId === currentChannelId).length;
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
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
      <span className="text-muted">{t('messages.counter.key', { count })}</span>
    </div>
  );
};

export default MessagesCounter;
