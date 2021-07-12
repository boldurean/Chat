import { useContext } from 'react';
import apiContext from '../../contexts/apiContext.js';

const useAPI = () => useContext(apiContext);

export default useAPI;
