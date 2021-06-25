import React, { useState } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, Link,
} from 'react-router-dom';
import Chat from './Chat.jsx';
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import authContext from '../contexts/authContext.js';
import useAuth from '../hooks/index.js';

const hasToken = JSON.parse(localStorage.getItem('userId')) !== null;

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(hasToken);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{
      loggedIn, logIn, logOut,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ children, path }) => {
  const auth = useAuth();

  return (
    <Route
      path={path}
      render={({ location }) => (auth.loggedIn
        ? children
        : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
    />
  );
};

const AuthButton = () => {
  const auth = useAuth();
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : null
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar bg="light" expand="true">
        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        <AuthButton />
      </Navbar>

      <Switch>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/">
          <Chat />
        </PrivateRoute>
      </Switch>
    </Router>
  </AuthProvider>
);

export default App;
