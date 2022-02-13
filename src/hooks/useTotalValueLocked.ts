import { useEffect, useState } from 'react';
import usePlatFinance from './usePlatFinance';
import useRefresh from './useRefresh';

const useTotalValueLocked = () => {
  const [totalValueLocked, setTotalValueLocked] = useState<Number>(0);
  const { slowRefresh } = useRefresh();
  const platFinance = usePlatFinance();

  useEffect(() => {
    async function fetchTVL() {
      try {
        setTotalValueLocked(await platFinance.getTotalValueLocked());
      }
      catch(err){
        console.error(err);
      }
    }
    fetchTVL();
  }, [setTotalValueLocked, platFinance, slowRefresh]);

  return totalValueLocked;
};

export default useTotalValueLocked;
