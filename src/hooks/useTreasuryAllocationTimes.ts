import { useEffect, useState } from 'react';
import usePlatFinance from './usePlatFinance';
import { AllocationTime } from '../plat-finance/types';
import useRefresh from './useRefresh';


const useTreasuryAllocationTimes = () => {
  const { slowRefresh } = useRefresh();
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const platFinance = usePlatFinance();
  useEffect(() => {
    if (platFinance) {
      platFinance.getTreasuryNextAllocationTime().then(setTime);
    }
  }, [platFinance, slowRefresh]);
  return time;
};

export default useTreasuryAllocationTimes;
