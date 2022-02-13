import { useEffect, useState } from 'react';
import useRefresh from '../useRefresh';
import usePlatFinance from './../usePlatFinance';

const useClaimRewardCheck = () => {
  const  { slowRefresh } = useRefresh();
  const [canClaimReward, setCanClaimReward] = useState(false);
  const platFinance = usePlatFinance();
  const isUnlocked = platFinance?.isUnlocked;

  useEffect(() => {
    async function canUserClaimReward() {
      try {
        setCanClaimReward(await platFinance.canUserClaimRewardFromMasonry());
      } catch(err){
        console.error(err);
      };
    }
    if (isUnlocked) {
      canUserClaimReward();
    }
  }, [isUnlocked, slowRefresh, platFinance]);

  return canClaimReward;
};

export default useClaimRewardCheck;
