import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { logger } from '../../services/logger/index.js';
import routes from '../../services/api/routes.js';

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
      logger.error(e);
      throw e;
    }
  }
};

export default fetchChatData;