import React from 'react';
import { useModal } from './ChannelsModalProvider.jsx';
import getModal from './index.js';

const ChannelsModal = () => {
  const { modal } = useModal();
  if (!modal.type) return null;

  const Modal = getModal(modal.type);
  return <Modal />;
};

export default ChannelsModal;
