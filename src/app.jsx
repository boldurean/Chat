import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './components/home.jsx';
import Login from './components/login.jsx';
import Error404 from './components/Error404.jsx';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/404">
          <Error404 />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </div>
  </Router>
);

const DOM = <App />;

export default DOM;
