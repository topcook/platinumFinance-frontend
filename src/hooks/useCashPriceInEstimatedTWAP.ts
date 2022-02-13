import { useEffect, useState } from 'react';
import usePlatFinance from './usePlatFinance';
import { TokenStat } from '../plat-finance/types';
import useRefresh from './useRefresh';

const useCashPriceInEstimatedTWAP = () => {
  const [stat, setStat] = useState<TokenStat>();
  const platFinance = usePlatFinance();
  const { slowRefresh } = useRefresh(); 

  useEffect(() => {
    async function fetchCashPrice() {
      try {
        setStat(await platFinance.getPlatStatInEstimatedTWAP());
      }catch(err) {
        console.error(err);
      }
    }
    fetchCashPrice();
  }, [setStat, platFinance, slowRefresh]);

  return stat;
};

export default useCashPriceInEstimatedTWAP;
