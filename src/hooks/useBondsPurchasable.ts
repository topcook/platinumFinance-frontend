import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import ERC20 from '../plat-finance/ERC20';
import usePlatFinance from './usePlatFinance';
import config from '../config';

const useBondsPurchasable = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const platFinance = usePlatFinance();

  useEffect(() => {
    async function fetchBondsPurchasable() {
        try {
            setBalance(await platFinance.gepBondsPurchasable());
        }
        catch(err) {
            console.error(err);
        }
      }
    fetchBondsPurchasable();
  }, [setBalance, platFinance]);

  return balance;
};

export default useBondsPurchasable;
