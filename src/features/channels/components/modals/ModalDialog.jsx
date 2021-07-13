import React from 'react';
import useModal from './useModal.js';

const ModalDialog = () => {
  const { getModal, modal } = useModal();
  if (!modal.type) return null;

  const Component = getModal(modal.type);
  return <Component />;
};

export default ModalDialog;
