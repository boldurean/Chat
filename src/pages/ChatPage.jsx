import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { CreateChannel, ChannelsList, Modal } from '../features/channels';
import ModalsProvider from '../features/channels/components/modals/ModalsProvider.jsx';
import { MessagesBox, MessagesCounter, MessageField } from '../features/chat';
import { fetchData } from '../features/init';

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <ModalsProvider>
      <Container bsPrefix="container h-100 my-4 overflow-hidden rounded shadow">
        <Row bsPrefix="row h-100 bg-white flex-md-row">
          <Col bsPrefix="col-4 col-md-3 col-lg-2 border-end pt-5 px-0 bg-light overflow-auto h-100">
            <div className="d-flex justify-content-between mb-2 ps-2 pe-2">
              <span>{t('channels.channels')}</span>
              <CreateChannel />
            </div>
            <ChannelsList />
          </Col>
          <Col bsPrefix="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <MessagesCounter />
              <MessagesBox />
              <MessageField />
            </div>
          </Col>
          <Modal />
        </Row>
      </Container>
    </ModalsProvider>
  );
};

export default Chat;
