import { useEffect, useState } from 'react';
import usePlatFinance from './../usePlatFinance';
import useRefresh from '../useRefresh';

const useWithdrawCheck = () => {
  const [canWithdraw, setCanWithdraw] = useState(false);
  const platFinance = usePlatFinance();
  const { slowRefresh } = useRefresh();
  const isUnlocked = platFinance?.isUnlocked;

  useEffect(() => {
    async function canUserWithdraw() {
      try {
        setCanWithdraw(await platFinance.canUserUnstakeFromMasonry());
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      canUserWithdraw();
    }
  }, [isUnlocked, platFinance, slowRefresh]);

  return canWithdraw;
};

export default useWithdrawCheck;
