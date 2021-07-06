import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import rollbar from '../Rollbar.js';
import routes from '../routes.js';

export const fetchingDataRequest = createAction('FETCH_DATA_REQUEST');
export const fetchingDataSuccess = createAction('FETCH_DATA_SUCCESS');
export const fetchingDataFailure = createAction('FETCH_DATA_FAILURE');

const fetchChatData = () => async (dispatch) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId) {
    try {
      dispatch(fetchingDataRequest());
      const req = await axios.get(routes.dataPath(), {
        headers: {
          Authorization: `Bearer ${userId.token}`,
        },
      });
      dispatch(fetchingDataSuccess({ ...req.data }));
    } catch (e) {
      dispatch(fetchingDataFailure());
      rollbar.error(e);
      throw e;
    }
  }
};

export default fetchChatData;
