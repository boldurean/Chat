import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logger } from '../../services/logger/index.js';
import routes from '../../services/api/routes.js';

export const fetchData = createAsyncThunk(
  'fetchData',
  async () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
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

export default fetchData;
