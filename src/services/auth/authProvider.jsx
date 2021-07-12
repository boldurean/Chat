import React, { useState } from 'react';
import authContext from '../../contexts/authContext.js';

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

export default AuthProvider;
