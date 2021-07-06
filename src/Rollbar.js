import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: '980e4a1b2f9e4983816a35d5e81411b9',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

export default rollbar;
