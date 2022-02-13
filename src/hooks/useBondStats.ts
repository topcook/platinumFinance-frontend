import { useEffect, useState } from 'react';
import usePlatFinance from './usePlatFinance';
import { TokenStat } from '../plat-finance/types';
import useRefresh from './useRefresh';

const useBondStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const { slowRefresh } = useRefresh();
  const platFinance = usePlatFinance();

  useEffect(() => {
    async function fetchBondPrice() {
      try {
        setStat(await platFinance.gepBondStat());
      }
      catch(err){
        console.error(err);
      }
    }
    fetchBondPrice();
  }, [setStat, platFinance, slowRefresh]);

  return stat;
};

export default useBondStats;
