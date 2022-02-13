import { useCallback, useEffect, useState } from 'react';
import usePlatFinance from '../usePlatFinance';
import { useWallet } from 'use-wallet';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

const useEstimateSPlat = (pbondAmount: string) => {
  const [estimateAmount, setEstimateAmount] = useState<string>('');
  const { account } = useWallet();
  const platFinance = usePlatFinance();

  const estimateAmountOfSPlat = useCallback(async () => {
    const pbondAmountBn = parseUnits(pbondAmount);
    const amount = await platFinance.estimateAmountOfSPlat(pbondAmountBn.toString());
    setEstimateAmount(amount);
  }, [account]);

  useEffect(() => {
    if (account) {
      estimateAmountOfSPlat().catch((err) => console.error(`Failed to get estimateAmountOfSPlat: ${err.stack}`));
    }
  }, [account, estimateAmountOfSPlat]);

  return estimateAmount;
};

export default useEstimateSPlat;