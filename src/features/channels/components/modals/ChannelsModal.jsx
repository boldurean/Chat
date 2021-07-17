import React from 'react';
import useModal from './useModal.js';

const ChannelsModal = () => {
  const { getModal, modal } = useModal();
  if (!modal.type) return null;

  const Modal = getModal(modal.type);
  return <Modal />;
};

export default ChannelsModal;
