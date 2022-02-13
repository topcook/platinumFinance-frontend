import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import PlatFinance from '../../plat-finance';
import config from '../../config';

export interface PlatFinanceContext {
  platFinance?: PlatFinance;
}

export const Context = createContext<PlatFinanceContext>({ platFinance: null });

export const PlatFinanceProvider: React.FC = ({ children }) => {
  const { ethereum, account } = useWallet();
  const [platFinance, setPlatFinance] = useState<PlatFinance>();

  useEffect(() => {
    if (!platFinance) {
      const plat = new PlatFinance(config);
      if (account) {
        // wallet was unlocked at initialization
        plat.unlockWallet(ethereum, account);
      }
      setPlatFinance(plat);
    } else if (account) {
      platFinance.unlockWallet(ethereum, account);
    }
  }, [account, ethereum, platFinance]);

  return <Context.Provider value={{ platFinance }}>{children}</Context.Provider>;
};
