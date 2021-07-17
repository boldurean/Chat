import React, { useState } from 'react';
import modalsContext from './modalsContext.js';
import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const ChannelsModalProvider = ({ children }) => {
  const [modal, setModal] = useState({ type: null, channel: null });
  const hideModal = () => setModal({ type: null, channel: null });
  const showModal = (type, channel = null) => setModal({ type, channel });

  const modals = {
    adding: Add,
    removing: Remove,
    renaming: Rename,
  };

  const getModal = (modalType) => modals[modalType];

  return (
    <modalsContext.Provider
      value={{
        modal,
        setModal,
        hideModal,
        showModal,
        getModal,
      }}
    >
      {children}
    </modalsContext.Provider>
  );
};

export default ChannelsModalProvider;
