import { useEffect, useState } from 'react';
import usePlatFinance from '../usePlatFinance';
import { SPlatSwapperStat } from '../../plat-finance/types';
import useRefresh from '../useRefresh';

const useSPlatSwapperStats = (account: string) => {
  const [stat, setStat] = useState<SPlatSwapperStat>();
  const { fastRefresh/*, slowRefresh*/ } = useRefresh();
  const platFinance = usePlatFinance();

  useEffect(() => {
    async function fetchSPlatSwapperStat() {
      try{
        if(platFinance.myAccount) {
          setStat(await platFinance.getSPlatSwapperStat(account));
        }
      }
      catch(err){
        console.error(err);
      }
    }
    fetchSPlatSwapperStat();
  }, [setStat, platFinance, fastRefresh, account]);

  return stat;
};

export default useSPlatSwapperStats;