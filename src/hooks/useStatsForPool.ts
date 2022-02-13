import { useCallback, useState, useEffect } from 'react';
import usePlatFinance from './usePlatFinance';
import { Bank } from '../plat-finance';
import { PoolStats } from '../plat-finance/types';
import config from '../config';

const useStatsForPool = (bank: Bank) => {
  const platFinance = usePlatFinance();

  const [poolAPRs, setPoolAPRs] = useState<PoolStats>();

  const fetchAPRsForPool = useCallback(async () => {
    setPoolAPRs(await platFinance.getPoolAPRs(bank));
  }, [platFinance, bank]);

  useEffect(() => {
    fetchAPRsForPool().catch((err) => console.error(`Failed to fetch PBOND price: ${err.stack}`));
    const refreshInterval = setInterval(fetchAPRsForPool, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPoolAPRs, platFinance, fetchAPRsForPool]);
  return poolAPRs;
};

export default useStatsForPool;
