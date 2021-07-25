import React from 'react';
import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../Slice.js';
import { useModal } from './modals/ChannelsModalProvider.jsx';

const ChannelButton = ({ channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showModal } = useModal();
  const currentChannelId = useSelector(selectors.getCurrentChannelId);
  const { switchChannel } = actions;

  const buttonType = channel.id === currentChannelId ? 'btn btn-secondary' : 'btn';

  if (!channel.removable) {
    return (
      <Nav.Item as="li" bsPrefix="nav-item w-100">
        <Button
          variant={buttonType}
          className="w-100 rounded-0 text-start"
          onClick={() => dispatch(switchChannel(channel.id))}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item as="li" bsPrefix="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          variant={buttonType}
          className="w-100 rounded-0 text-start text-truncate"
          onClick={() => dispatch(switchChannel(channel.id))}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>

        <Dropdown.Toggle
          split
          variant={buttonType}
          id="dropdown-split-basic"
          data-testid="dropdown"
        />

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => showModal('removing', channel)}>
            {t('buttons.remove')}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => showModal('renaming', channel)}>
            {t('buttons.rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

const ChannelsList = () => {
  const channelsList = useSelector(selectors.getChannels);

  return (
    <Nav as="ul" className="flex-column nav-pills nav-fill px-2">
      {channelsList.map((channel) => (
        <ChannelButton
          key={channel.id}
          channel={channel}
        />
      ))}
    </Nav>
  );
};

export default ChannelsList;
