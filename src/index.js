// @ts-check
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import { render } from 'react-dom';
import socket from './services/api/socket.js';
import init from './init.jsx';

const runApp = async () => {
  render(
    await init(socket),
    document.getElementById('chat'),
  );
};
runApp();
