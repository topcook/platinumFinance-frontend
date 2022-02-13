import { useContext } from 'react';
import { Context } from '../contexts/PlatFinanceProvider';

const usePlatFinance = () => {
  const { platFinance } = useContext(Context);
  return platFinance;
};

export default usePlatFinance;
