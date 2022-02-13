import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import usePlatFinance from './usePlatFinance';

const useTreasuryAmount = () => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const platFinance = usePlatFinance();

  useEffect(() => {
    if (platFinance) {
      const { Treasury } = platFinance.contracts;
      platFinance.PLAT.balanceOf(Treasury.address).then(setAmount);
    }
  }, [platFinance]);
  return amount;
};

export default useTreasuryAmount;
