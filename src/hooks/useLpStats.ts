import { useEffect, useState } from 'react';
import usePlatFinance from './usePlatFinance';
import { LPStat } from '../plat-finance/types';
import useRefresh from './useRefresh';

const useLpStats = (lpTicker: string) => {
  const [stat, setStat] = useState<LPStat>();
  const { slowRefresh } = useRefresh();
  const platFinance = usePlatFinance();

  useEffect(() => {
    async function fetchLpPrice() {
      try{
        setStat(await platFinance.getLPStat(lpTicker));
      }
      catch(err){
        console.error(err);
      }
    }
    fetchLpPrice();
  }, [setStat, platFinance, slowRefresh, lpTicker]);

  return stat;
};

export default useLpStats;
