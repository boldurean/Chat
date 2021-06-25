import { useContext } from 'react';

import authContext from '../contexts/authContext.js';

const useAuth = () => useContext(authContext);

export default useAuth;
