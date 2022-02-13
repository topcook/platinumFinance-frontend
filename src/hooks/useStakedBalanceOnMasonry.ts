import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import usePlatFinance from './usePlatFinance';
import useRefresh from './useRefresh';

const useStakedBalanceOnMasonry = () => {
  const { slowRefresh } = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const platFinance = usePlatFinance();
  const isUnlocked = platFinance?.isUnlocked;
  useEffect(() => {
    async function fetchBalance() {
      try {
        setBalance(await platFinance.getStakedSharesOnMasonry());
      } catch (e) {
        console.error(e);
      }
    }
    if (isUnlocked) {
      fetchBalance();
    }
  }, [slowRefresh, isUnlocked, platFinance]);
  return balance;
};

export default useStakedBalanceOnMasonry;
