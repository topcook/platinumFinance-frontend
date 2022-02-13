import { useCallback, useEffect, useState } from 'react';
import usePlatFinance from './usePlatFinance';
import useStakedBalanceOnMasonry from './useStakedBalanceOnMasonry';

const useMasonryVersion = () => {
  const [masonryVersion, setMasonryVersion] = useState('latest');
  const platFinance = usePlatFinance();
  const stakedBalance = useStakedBalanceOnMasonry();

  const updateState = useCallback(async () => {
    setMasonryVersion(await platFinance.fetchMasonryVersionOfUser());
  }, [platFinance?.isUnlocked, stakedBalance]);

  useEffect(() => {
    if (platFinance?.isUnlocked) {
      updateState().catch((err) => console.error(err.stack));
    }
  }, [platFinance?.isUnlocked, stakedBalance]);

  return masonryVersion;
};

export default useMasonryVersion;
