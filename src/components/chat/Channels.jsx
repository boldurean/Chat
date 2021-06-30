import React, { useEffect } from 'react';
import {
  Button,
  ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../app/slices';
import fetchChatData from '../../app/slices/fetchData.js';

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
    <Nav.Item key={channel.id} as="li" bsPrefix="nav-item w-100">
      <Dropdown as={ButtonGroup} className="w-100">
        <Button
          variant="btn"
          className={`w-100 rounded-0 text-start ${buttonType}`}
          onClick={() => dispatch(actions.switchChannel(channel.id))}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
        <Dropdown.Toggle split variant="btn" className={buttonType} />
        <Dropdown.Menu className="super-colors">
          <Dropdown.Item eventKey="1">Rename</Dropdown.Item>
          <Dropdown.Item eventKey="2">Delete channel</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatData());
  }, []);

  return (
    <Nav as="ul" bsPrefix="nav flex-column nav-pills nav-fill px-2">
      {channels.map((channel) => renderChannelButton(channel, currentChannelId, dispatch))}
    </Nav>
  );
};

export default Channels;
