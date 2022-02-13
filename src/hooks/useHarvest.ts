import { useCallback } from 'react';
import usePlatFinance from './usePlatFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { Bank } from '../plat-finance';

const useHarvest = (bank: Bank) => {
  const platFinance = usePlatFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      platFinance.harvest(bank.contract, bank.poolId),
      `Claim ${bank.earnTokenName} from ${bank.contract}`,
    );
  }, [bank, platFinance, handleTransactionReceipt]);

  return { onReward: handleReward };
};

export default useHarvest;
