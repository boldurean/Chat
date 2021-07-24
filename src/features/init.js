import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { routes } from '../services/api.jsx';

const fetchData = createAsyncThunk(
  'init',
  async ({ logger, user }) => {
    try {
      const req = await axios.get(routes.dataPath(), {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return { ...req.data };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  },
);

export default fetchData;
