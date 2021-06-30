import React from 'react';
import {
  Col, Container, Row,
} from 'react-bootstrap';
import Channels from './Channels.jsx';
import MessagesBox from './MessagesBox.jsx';
import MessagesCounter from './MessagesCounter.jsx';
import MessagesField from './MessagesField.jsx';

const Chat = () => (
  <Container bsPrefix="container h-100 my-4 overflow-hidden rounded shadow">
    <Row bsPrefix="row h-100 bg-white flex-md-row">
      <Col bsPrefix="col-4 col-md-2 border-end pt-5 px-0 bg-light">
        <div className="d-flex justify-content-between mb-2 ps-2 pe-2">
          <span>Channels</span>
          <button type="button" className="p-0 text-primary btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path
                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
              />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            <span className="visually-hidden">+</span>
          </button>
        </div>
        <Channels />
      </Col>
      <Col bsPrefix="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <MessagesCounter />
          <MessagesBox />
          <MessagesField />
        </div>
      </Col>
    </Row>
  </Container>
);

export default Chat;
