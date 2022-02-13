import { useCallback } from 'react';
import usePlatFinance from './usePlatFinance';
import { Bank } from '../plat-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useZap = (bank: Bank) => {
  const platFinance = usePlatFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleZap = useCallback(
    (zappingToken: string, tokenName: string, amount: string) => {
      handleTransactionReceipt(
        platFinance.zapIn(zappingToken, tokenName, amount),
        `Zap ${amount} in ${bank.depositTokenName}.`,
      );
    },
    [bank, platFinance, handleTransactionReceipt],
  );
  return { onZap: handleZap };
};

export default useZap;
