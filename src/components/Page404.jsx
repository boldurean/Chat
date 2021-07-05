import React from 'react';
import { useHistory } from 'react-router-dom';

const Page404 = () => {
  const history = useHistory();
  return (
    <div>
      <div>
        <img
          src="https://media.tenor.com/images/323393ed1e06a5850cdc5fd66684f59d/tenor.gif"
          alt="rick-roll"
        />
      </div>
      <button onClick={() => history.goBack()} className="btn btn-info mt-2" type="button" to="/">
        back
      </button>
    </div>
  );
};

export default Page404;
