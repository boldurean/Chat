import Rollbar from 'rollbar';

const logger = new Rollbar({
  accessToken: process.env.TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
  enabled: process.env.NODE_ENV === 'production',
});

export default logger;
