import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router, Switch, Route, Redirect, Link,
} from 'react-router-dom';
import {
  ChatPage, LoginPage, SignupPage, ErrorPage,
} from './pages';
import { AuthProvider, useAuth } from './services/auth';

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

const App = () => (
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
            <ChatPage />
          </PrivateRoute>
          <Route path="/404">
            <ErrorPage />
          </Route>
          <Redirect to="/404" />
        </Switch>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
