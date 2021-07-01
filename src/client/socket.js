import io from 'socket.io-client';

const URL = window.location.host;
const socket = io.connect(URL);

export default socket;
