import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import usePlatFinance from './usePlatFinance';
import useRefresh from './useRefresh';

const useTotalStakedOnMasonry = () => {
  const [totalStaked, setTotalStaked] = useState(BigNumber.from(0));
  const platFinance = usePlatFinance();
  const { slowRefresh } = useRefresh();
  const isUnlocked = platFinance?.isUnlocked;

  useEffect(() => {
    async function fetchTotalStaked() {
      try {
        setTotalStaked(await platFinance.getTotalStakedInMasonry());
      } catch(err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
     fetchTotalStaked();
    }
  }, [isUnlocked, slowRefresh, platFinance]);

  return totalStaked;
};

export default useTotalStakedOnMasonry;
