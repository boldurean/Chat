import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { routes } from './api.jsx';

const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const [isLoggedIn, setIsLoggedIn] = useState(userId !== null);
  const { Provider } = authContext;

  const logIn = async (loginData) => {
    const res = await axios.post(routes.loginPath(), loginData);
    localStorage.setItem('userId', JSON.stringify(res.data));
    setIsLoggedIn(true);
  };

  const signUp = async (signingData) => {
    const res = await axios.post(routes.signupPath(), signingData);
    localStorage.setItem('userId', JSON.stringify(res.data));
    setIsLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
  };

  return (
    <Provider
      value={{
        userId,
        isLoggedIn,
        logIn,
        signUp,
        logOut,
      }}
    >
      {children}
    </Provider>
  );
};

const useAuth = () => useContext(authContext);

export {
  AuthProvider,
  useAuth,
};
