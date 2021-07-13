// @ts-check
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import { render } from 'react-dom';
import socket from './services/api/socket.js';
import init from './init.jsx';

render(
  init(socket),
  document.getElementById('chat'),
);
