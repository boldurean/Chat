import React from 'react';
import {
  ButtonGroup,
  Button,
  Col, Container, Dropdown, DropdownButton, Form, FormControl, InputGroup, Nav, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../app/slices';

const renderChannelButton = (channel, currentChannelId, dispatch) => {
  const buttonType = channel.id === currentChannelId
    ? 'btn btn-secondary'
    : 'btn';
  if (!channel.removable) {
    return (
      <Nav.Item key={channel.id} as="li" bsPrefix="nav-item w-100">
        <button
          type="button"
          className={`w-100 rounded-0 text-start ${buttonType}`}
          onClick={() => dispatch(actions.switchChannel(channel.id))}
        >
          <span className="me-1">#</span>
          {channel.name}
        </button>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item as="li" bsPrefix="nav-item w-100">
      <ButtonGroup>
        <DropdownButton as={ButtonGroup} title={channel.name} id="bg-nested-dropdown">
          <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
          <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    </Nav.Item>
  );
};

const Chat = () => {
  const { channels, currentChannelId } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <Container bsPrefix="container h-100 my-4 overflow-hidden rounded shadow">
      <Row bsPrefix="row h-100 bg-white flex-md-row">
        <Col bsPrefix="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
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
          <Nav as="ul" bsPrefix="nav flex-column nav-pills nav-fill px-2">
            {channels.map((channel) => renderChannelButton(channel, currentChannelId, dispatch))}
          </Nav>
        </Col>
        <Col bsPrefix="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  {channels.reduce((acc, channel) => {
                    if (channel.id === currentChannelId) {
                      return acc + channel.name;
                    }
                    return acc;
                  }, '# ')}
                </b>
              </p>
              <span className="text-muted">0 сообщений</span>
            </div>
            <div id="message-box" className="chat-messages overflow-auto px-5 ">
              message box
            </div>
            <div className="mt-auto px-5 py-3">
              <Form>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Message"
                  />
                  <ButtonGroup>
                    <Button bsPrefix="btn btn-group-vertical">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                        />
                      </svg>
                      <span className="visually-hidden">Отправить</span>
                    </Button>
                  </ButtonGroup>
                </InputGroup>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
