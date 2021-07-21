import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../services/auth.jsx';

const PrivateRoute = ({ children, exact, path }) => {
  const auth = useAuth();

  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) => (auth.isLoggedIn ? (
        children
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      ))}
    />
  );
};

export default PrivateRoute;
