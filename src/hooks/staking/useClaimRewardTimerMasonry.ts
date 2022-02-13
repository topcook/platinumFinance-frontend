import { useEffect, useState } from 'react';
import usePlatFinance from '../usePlatFinance';
import { AllocationTime } from '../../plat-finance/types';

const useClaimRewardTimerMasonry = () => {
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const platFinance = usePlatFinance();

  useEffect(() => {
    if (platFinance) {
      platFinance.getUserClaimRewardTime().then(setTime);
    }
  }, [platFinance]);
  return time;
};

export default useClaimRewardTimerMasonry;
