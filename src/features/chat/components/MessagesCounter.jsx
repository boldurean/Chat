import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../../channels/Slice.js';
import { selectors } from '../Slice.js';

const MessagesCounter = () => {
  const { t } = useTranslation();
  const channelName = useSelector(channelsSelectors.getCurrentChannelName);
  const count = useSelector(selectors.getCurrentChannelMessages).length;
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {' '}
          {channelName}
        </b>
      </p>
      <span className="text-muted">{t('messages.counter.key', { count })}</span>
    </div>
  );
};

export default MessagesCounter;
