import { useCallback } from 'react';
import usePlatFinance from './usePlatFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';
import { TAX_OFFICE_ADDR } from './../utils/constants'

const useProvidePlatFtmLP = () => {
  const platFinance = usePlatFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleProvidePlatFtmLP = useCallback(
    (ftmAmount: string, platAmount: string) => {
      const platAmountBn = parseUnits(platAmount);
      handleTransactionReceipt(
        platFinance.providePlatFtmLP(ftmAmount, platAmountBn),
        `Provide Plat-FTM LP ${platAmount} ${ftmAmount} using ${TAX_OFFICE_ADDR}`,
      );
    },
    [platFinance, handleTransactionReceipt],
  );
  return { onProvidePlatFtmLP: handleProvidePlatFtmLP };
};

export default useProvidePlatFtmLP;
