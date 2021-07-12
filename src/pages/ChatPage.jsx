import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CreateChannel, ChannelsList } from '../features/channels';
import { MessagesBox, MessagesCounter, MessageField } from '../features/chat';
import getModal from '../features/channels/components/modals';

const renderModal = ({ modal, hideModal }) => {
  if (!modal.type) return null;

  const Modal = getModal(modal.type);
  return <Modal modal={modal} hideModal={hideModal} />;
};

export default () => {
  const [modal, setModal] = useState({ type: null, channel: null });
  const { t } = useTranslation();
  const hideModal = () => setModal({ type: null, channel: null });
  const showModal = (type, channel = null) => setModal({ type, channel });

  return (
    <Container bsPrefix="container h-100 my-4 overflow-hidden rounded shadow">
      <Row bsPrefix="row h-100 bg-white flex-md-row">
        <Col bsPrefix="col-4 col-md-3 col-lg-2 border-end pt-5 px-0 bg-light overflow-auto h-100">
          <div className="d-flex justify-content-between mb-2 ps-2 pe-2">
            <span>{t('channels.channels')}</span>
            <CreateChannel showModal={showModal} />
          </div>
          <ChannelsList showModal={showModal} />
        </Col>
        <Col bsPrefix="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <MessagesCounter />
            <MessagesBox />
            <MessageField />
          </div>
        </Col>
        {renderModal({ modal, hideModal })}
      </Row>
    </Container>
  );
};
