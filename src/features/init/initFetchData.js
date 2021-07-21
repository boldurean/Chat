import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { routes } from '../../services/api.jsx';

export const initFetchData = createAsyncThunk(
  'initFetchData',
  async ({ logger, userId }) => {
    if (userId) {
      try {
        const req = await axios.get(routes.dataPath(), {
          headers: {
            Authorization: `Bearer ${userId.token}`,
          },
        });
        return { ...req.data };
      } catch (e) {
        logger.error(e);
        throw e;
      }
    }
    throw new Error('network problems');
  },
);

export default initFetchData;
