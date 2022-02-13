import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import usePlatFinance from './usePlatFinance';
import { ContractName } from '../plat-finance';
import config from '../config';

const useStakedBalance = (poolName: ContractName, poolId: Number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const platFinance = usePlatFinance();
  const isUnlocked = platFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await platFinance.stakedBalanceOnBank(poolName, poolId, platFinance.myAccount);
    setBalance(balance);
  }, [poolName, poolId, platFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, poolName, setBalance, platFinance, fetchBalance]);

  return balance;
};

export default useStakedBalance;
