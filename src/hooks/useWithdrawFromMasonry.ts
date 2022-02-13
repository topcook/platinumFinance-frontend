import { useCallback } from 'react';
import usePlatFinance from './usePlatFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromMasonry = () => {
  const platFinance = usePlatFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        platFinance.withdrawShareFromMasonry(amount),
        `Withdraw ${amount} SPLAT from the masonry`,
      );
    },
    [platFinance, handleTransactionReceipt],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdrawFromMasonry;
