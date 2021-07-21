import React from 'react';
import { useModal } from './ChannelsModalProvider.jsx';
import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

const getModal = (modalType) => modals[modalType];

const ChannelsModal = () => {
  const { modal } = useModal();
  if (!modal.type) return null;

  const Modal = getModal(modal.type);
  return <Modal />;
};

export default ChannelsModal;
