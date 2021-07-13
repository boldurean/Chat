import { useContext } from 'react';
import apiContext from './apiContext.js';

const useAPI = () => useContext(apiContext);

export default useAPI;
