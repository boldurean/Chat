// @ts-check
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import { render } from 'react-dom';
import io from 'socket.io-client';
import init from './init.jsx';

const socket = io.connect();

const runApp = async () => {
  render(
    await init(socket),
    document.getElementById('chat'),
  );
};
runApp();
