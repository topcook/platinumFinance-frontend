import { useCallback } from 'react';
import usePlatFinance from './usePlatFinance';
import { Bank } from '../plat-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (bank: Bank) => {
  const platFinance = usePlatFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(platFinance.exit(bank.contract, bank.poolId), `Redeem ${bank.contract}`);
  }, [bank, platFinance, handleTransactionReceipt]);

  return { onRedeem: handleRedeem };
};

export default useRedeem;
