import { useCallback } from 'react';
import usePlatFinance from '../usePlatFinance';
import useHandleTransactionReceipt from '../useHandleTransactionReceipt';
// import { BigNumber } from "ethers";
import { parseUnits } from 'ethers/lib/utils';


const useSwapPBondToSPlat = () => {
  const platFinance = usePlatFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleSwapSPlat = useCallback(
  	(pbondAmount: string) => {
	  	const pbondAmountBn = parseUnits(pbondAmount, 18);
	  	handleTransactionReceipt(
	  		platFinance.swapPBondToSPlat(pbondAmountBn),
	  		`Swap ${pbondAmount} PBond to SPlat`
	  	);
  	},
  	[platFinance, handleTransactionReceipt]
  );
  return { onSwapSPlat: handleSwapSPlat };
};

export default useSwapPBondToSPlat;