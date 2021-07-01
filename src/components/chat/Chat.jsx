import React from 'react';
import {
  Col, Container, Row,
} from 'react-bootstrap';
import AddChannelButton from './AddChannelButton.jsx';
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
          <AddChannelButton />
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
