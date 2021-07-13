import { useContext } from 'react';
import modalsContext from './modalsContext.js';

const useModal = () => useContext(modalsContext);

export default useModal;
