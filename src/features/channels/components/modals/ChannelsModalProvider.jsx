import React, { createContext, useContext, useState } from 'react';

const modalsContext = createContext({});

const ChannelsModalProvider = ({ children }) => {
  const [modal, setModal] = useState({ type: null, channel: null });
  const hideModal = () => setModal({ type: null, channel: null });
  const showModal = (type, channel = null) => setModal({ type, channel });

  const { Provider } = modalsContext;
  return (
    <Provider
      value={{
        modal,
        setModal,
        hideModal,
        showModal,
      }}
    >
      {children}
    </Provider>
  );
};

export const useModal = () => useContext(modalsContext);

export default ChannelsModalProvider;
