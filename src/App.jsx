import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router, Switch, Route, Redirect, Link,
} from 'react-router-dom';
import {
  ChatPage, LoginPage, SignupPage, ErrorPage,
} from './pages';
import { PrivateRoute } from './components';
import routes from './routes.js';
import { useAuth } from './services/auth.jsx';

const App = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar bsPrefix="shadow-sm navbar navbar-light bg-white mb-2 px-2" expand="true">
          <Navbar.Brand as={Link} to={routes.chatPage}>
            Hexlet Chat
          </Navbar.Brand>
          {auth.isLoggedIn && <Button onClick={auth.logOut}>{t('buttons.logout')}</Button>}
        </Navbar>

        <Switch>
          <Route path={routes.signupPage}>
            <SignupPage />
          </Route>
          <Route path={routes.loginPage}>
            <LoginPage />
          </Route>
          <PrivateRoute path={routes.chatPage} exact>
            <ChatPage />
          </PrivateRoute>
          <Route path={routes.errorPage}>
            <ErrorPage />
          </Route>
          <Redirect to={routes.errorPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
