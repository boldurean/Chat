import React from 'react';
import { PlusSquare } from 'react-bootstrap-icons';
import { useModal } from './modals/ChannelsModalProvider.jsx';

const CreateChannelButton = () => {
  const { showModal } = useModal();
  return (
    <button
      onClick={() => showModal('adding')}
      type="button"
      className="p-0 text-primary btn btn-group-vertical"
    >
      <PlusSquare size={20} />
      <span className="visually-hidden">+</span>
    </button>
  );
};

export default CreateChannelButton;
