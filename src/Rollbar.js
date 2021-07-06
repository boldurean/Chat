import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: 'c175e2e0d982418d8cc234a34954c833',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
});

export default rollbar;
