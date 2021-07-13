// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  chatPage: () => '/',
  loginPage: () => '/login',
  signupPage: () => '/signup',
  errorPage: () => '/404',
  loginPath: () => [host, prefix, 'login'].join('/'),
  signupPath: () => [host, prefix, 'signup'].join('/'),
  dataPath: () => [host, prefix, 'data'].join('/'),
};
