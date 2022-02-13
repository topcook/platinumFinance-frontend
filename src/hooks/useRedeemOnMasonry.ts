import { useCallback } from 'react';
import usePlatFinance from './usePlatFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeemOnMasonry = (description?: string) => {
  const platFinance = usePlatFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    const alertDesc = description || 'Redeem SPLAT from Masonry';
    handleTransactionReceipt(platFinance.exitFromMasonry(), alertDesc);
  }, [platFinance, description, handleTransactionReceipt]);
  return { onRedeem: handleRedeem };
};

export default useRedeemOnMasonry;
