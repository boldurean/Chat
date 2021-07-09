import React from 'react';
import { useHistory } from 'react-router-dom';
import bug from '../../img/bug.png';

const Error404 = () => {
  const history = useHistory();
  return (
    <div className="container text-center my-5">
      <h1 className="text-primary">
        <img src={bug} alt="bug" />
        404
      </h1>
      <h2 className="text-primary">Page not found</h2>
      {/* eslint-disable-next-line max-len */}
      <p>We are sorry, the page you requested could not be found. Please go back to the homepage or contact us at v.boldurean@gmail.com</p>
      <button
        type="button"
        className="btn btn-primary btn-md text-white mt-4"
        onClick={() => history.push('/')}
      >
        Take Me Home
      </button>
    </div>
  );
};

export default Error404;
