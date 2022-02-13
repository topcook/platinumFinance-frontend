import { useCallback, useEffect, useState } from 'react';
import usePlatFinance from './usePlatFinance';
import config from '../config';
import { BigNumber } from 'ethers';

const useCashPriceInLastTWAP = () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const platFinance = usePlatFinance();

  const fetchCashPrice = useCallback(async () => {
    setPrice(await platFinance.getPlatPriceInLastTWAP());
  }, [platFinance]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch PLAT price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPrice, platFinance, fetchCashPrice]);

  return price;
};

export default useCashPriceInLastTWAP;
