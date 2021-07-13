import { useContext } from 'react';

import authContext from './authContext.js';

const useAuth = () => useContext(authContext);

export default useAuth;
