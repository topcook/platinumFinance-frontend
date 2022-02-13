import { useEffect, useState } from 'react';
import usePlatFinance from './usePlatFinance';
import { TokenStat } from '../plat-finance/types';
import useRefresh from './useRefresh';

const usePlatStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const { fastRefresh } = useRefresh();
  const platFinance = usePlatFinance();

  useEffect(() => {
    async function fetchPlatPrice(){
      try {
        setStat(await platFinance.getPlatStat());
      }
      catch(err){
        console.error(err)
      }
    }
    fetchPlatPrice();
  }, [setStat, platFinance, fastRefresh]);

  return stat;
};

export default usePlatStats;
