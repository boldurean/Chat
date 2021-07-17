import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import bug from '../img/bug.png';

const ErrorPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <div className="container text-center my-5">
      <h1 className="text-primary">
        <img src={bug} alt="bug" />
        404
      </h1>
      <h2 className="text-primary">Page not found</h2>
      {/* eslint-disable-next-line max-len */}
      <p>{t('errors.pageNotFound')}</p>
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

export default ErrorPage;
