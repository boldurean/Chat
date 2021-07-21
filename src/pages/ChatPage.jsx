import React, { useEffect, useState } from 'react';
import {
  Col, Container, Row, Spinner,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Channels } from '../features/channels';
import { MessagesBox, MessagesCounter, MessageField } from '../features/chat';
import { fetchData } from '../features/init';
import { useAuth } from '../services/auth.jsx';
import { useLogger } from '../services/logger.jsx';

const Chat = () => {
  const [isDataReceived, setIsDataReceived] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const logger = useLogger();
  const { userId } = useAuth();

  useEffect(() => {
    dispatch(fetchData({ logger, userId })).then(() => setIsDataReceived(true));
    return () => setIsDataReceived(true);
  }, [userId, dispatch, logger]);

  return isDataReceived
    ? (
      <Container bsPrefix="container h-100 my-4 overflow-hidden rounded shadow">
        <Row bsPrefix="row h-100 bg-white flex-md-row">
          <Col bsPrefix="col-4 col-md-3 col-lg-2 border-end pt-5 px-0 bg-light overflow-auto h-100">
            <Channels />
          </Col>
          <Col bsPrefix="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <MessagesCounter />
              <MessagesBox />
              <MessageField />
            </div>
          </Col>
        </Row>
      </Container>
    )
    : (
      <Container className="h-100 d-flex justify-content-center alight-items-center">
        <Row className="align-items-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">{t('texts.loading')}</span>
          </Spinner>
        </Row>
      </Container>
    );
};

export default Chat;
