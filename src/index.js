// @ts-check
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import { render } from 'react-dom';
import socket from './services/api/socket.js';
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const vdom = init(socket);

render(
  vdom,
  document.getElementById('chat'),
);

console.log('it works!');
