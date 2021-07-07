import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: 'c175e2e0d982418d8cc234a34954c833',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
  enabled: process.env.NODE_ENV === 'production',
});

export default rollbar;
