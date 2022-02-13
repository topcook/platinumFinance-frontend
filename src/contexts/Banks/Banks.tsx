import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import usePlatFinance from '../../hooks/usePlatFinance';
import { Bank } from '../../plat-finance';
import config, { bankDefinitions } from '../../config';

const Banks: React.FC = ({ children }) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const platFinance = usePlatFinance();
  const isUnlocked = platFinance?.isUnlocked;

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (bankInfo.finished) {
        if (!platFinance.isUnlocked) continue;

        // only show pools staked by user
        const balance = await platFinance.stakedBalanceOnBank(
          bankInfo.contract,
          bankInfo.poolId,
          platFinance.myAccount,
        );
        if (balance.lte(0)) {
          continue;
        }
      }
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: platFinance.externalTokens[bankInfo.depositTokenName],
        earnToken: bankInfo.earnTokenName === 'PLAT' ? platFinance.PLAT : platFinance.SPLAT,
      });
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [platFinance, setBanks]);

  useEffect(() => {
    if (platFinance) {
      fetchPools().catch((err) => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [isUnlocked, platFinance, fetchPools]);

  return <Context.Provider value={{ banks }}>{children}</Context.Provider>;
};

export default Banks;
