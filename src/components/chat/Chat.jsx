import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AddChannelButton from './AddChannelButton.jsx';
import Channels from './ChannelsList.jsx';
import MessagesBox from './MessagesBox.jsx';
import MessagesCounter from './MessagesCounter.jsx';
import MessagesField from './MessagesField.jsx';
import getModal from './modals/index.js';
import ApiProvider from './ApiProvider.jsx';

const renderModal = ({ modal, hideModal }) => {
  if (!modal.type) return null;

  const Modal = getModal(modal.type);
  return <Modal modal={modal} hideModal={hideModal} />;
};

const Chat = () => {
  const [modal, setModal] = useState({ type: null, channel: null });
  const hideModal = () => setModal({ type: null, channel: null });
  const showModal = (type, channel = null) => setModal({ type, channel });

  return (
    <ApiProvider hideModal={hideModal}>
      <Container bsPrefix="container h-100 my-4 overflow-hidden rounded shadow">
        <Row bsPrefix="row h-100 bg-white flex-md-row">
          <Col bsPrefix="col-4 col-md-3 col-lg-2 border-end pt-5 px-0 bg-light overflow-auto h-100">
            <div className="d-flex justify-content-between mb-2 ps-2 pe-2">
              <span>Channels</span>
              <AddChannelButton showModal={showModal} />
            </div>
            <Channels showModal={showModal} />
          </Col>
          <Col bsPrefix="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <MessagesCounter />
              <MessagesBox />
              <MessagesField />
            </div>
          </Col>
          {renderModal({ modal, hideModal })}
        </Row>
      </Container>
    </ApiProvider>
  );
};

export default Chat;
