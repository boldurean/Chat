import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: 'c175e2e0d982418d8cc234a34954c833',
  environment: 'production',
};

const RollbarProvider = ({ children }) => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>{children}</ErrorBoundary>
  </Provider>
);
export default RollbarProvider;
