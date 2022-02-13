import { useEffect, useState } from 'react';
import usePlatFinance from './usePlatFinance';
import useRefresh from './useRefresh';

const useFetchMasonryAPR = () => {
  const [apr, setApr] = useState<number>(0);
  const platFinance = usePlatFinance();
  const { slowRefresh } = useRefresh(); 

  useEffect(() => {
    async function fetchMasonryAPR() {
      try {
        setApr(await platFinance.getMasonryAPR());
      } catch(err){
        console.error(err);
      }
    }
   fetchMasonryAPR();
  }, [setApr, platFinance, slowRefresh]);

  return apr;
};

export default useFetchMasonryAPR;
