import React from 'react';
import { useTranslation } from 'react-i18next';
import ChannelsModalProvider from './modals/ChannelsModalProvider.jsx';
import ChannelsList from './ChannelsList.jsx';
import CreateChannelButton from './CreateChannelButton.jsx';
import ChannelsModal from './modals/ChannelsModal.jsx';

const Channels = () => {
  const { t } = useTranslation();
  return (
    <ChannelsModalProvider>
      <div className="d-flex justify-content-between mb-2 ps-2 pe-2">
        <span>{t('channels.channels')}</span>
        <CreateChannelButton />
      </div>
      <ChannelsList />
      <ChannelsModal />
    </ChannelsModalProvider>
  );
};

export default Channels;
