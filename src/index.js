// @ts-check
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import { render } from 'react-dom';
import io from 'socket.io-client';
import init from './init.jsx';

const URL = window.location.host;
const socket = io.connect(URL);

const runApp = async () => {
  render(
    await init(socket),
    document.getElementById('chat'),
  );
};
runApp();
