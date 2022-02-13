import { useCallback } from 'react';
import usePlatFinance from './usePlatFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToMasonry = () => {
  const platFinance = usePlatFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(platFinance.stakeShareToMasonry(amount), `Stake ${amount} SPLAT to the masonry`);
    },
    [platFinance, handleTransactionReceipt],
  );
  return { onStake: handleStake };
};

export default useStakeToMasonry;
