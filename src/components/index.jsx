import React, { useState } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { I18nextProvider, useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router, Switch, Route, Redirect, Link,
} from 'react-router-dom';
import i18n from '../locales';
import Chat from './chat/Chat.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Error404 from './pages/Error404.jsx';
import SignupPage from './pages/SignupPage.jsx';
import authContext from '../contexts/authContext.js';
import useAuth from '../hooks/useAuth.js';

const hasToken = JSON.parse(localStorage.getItem('userId')) !== null;

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(hasToken);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider
      value={{
        loggedIn,
        logIn,
        logOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ children, exact, path }) => {
  const auth = useAuth();

  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) => (auth.loggedIn ? (
        children
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      ))}
    />
  );
};

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  return auth.loggedIn ? <Button onClick={auth.logOut}>{t('buttons.logout')}</Button> : null;
};

export default () => (
  <I18nextProvider i18n={i18n}>
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <Navbar bsPrefix="shadow-sm navbar navbar-light bg-white mb-2 px-2" expand="true">
            <Navbar.Brand as={Link} to="/">
              Hexlet Chat
            </Navbar.Brand>
            <AuthButton />
          </Navbar>

          <Switch>
            <Route path="/signup">
              <SignupPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/" exact>
              <Chat />
            </PrivateRoute>
            <Route path="/404">
              <Error404 />
            </Route>
            <Redirect to="/404" />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  </I18nextProvider>
);
