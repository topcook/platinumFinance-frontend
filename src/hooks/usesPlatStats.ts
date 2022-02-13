import { useEffect, useState } from 'react';
import usePlatFinance from './usePlatFinance';
import { TokenStat } from '../plat-finance/types';
import useRefresh from './useRefresh';

const useShareStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const { slowRefresh } = useRefresh();
  const platFinance = usePlatFinance();

  useEffect(() => {
    async function fetchSharePrice() {
      try {
        setStat(await platFinance.getsPlatStat());
      } catch(err){
        console.error(err)
      }
    }
    fetchSharePrice();
  }, [setStat, platFinance, slowRefresh]);

  return stat;
};

export default useShareStats;
