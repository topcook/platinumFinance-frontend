import React from 'react';

//Graveyard ecosystem logos
import platLogo from '../../assets/img/crypto_plat_cash.svg';
import sPlatLogo from '../../assets/img/crypto_plat_share.svg';
import platLogoPNG from '../../assets/img/crypto_plat_cash.f2b44ef4.png';
import sPlatLogoPNG from '../../assets/img/crypto_plat_share.bf1a6c52.png';
import pBondLogo from '../../assets/img/crypto_plat_bond.svg';

import platFtmLpLogo from '../../assets/img/plat_ftm_lp.png';
import splatFtmLpLogo from '../../assets/img/splat_ftm_lp.png';

import wftmLogo from '../../assets/img/ftm_logo_blue.svg';
import booLogo from '../../assets/img/spooky.png';
import zooLogo from '../../assets/img/zoo_logo.svg';
import shibaLogo from '../../assets/img/shiba_logo.svg';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  PLAT: platLogo,
  PLATPNG: platLogoPNG,
  SPLATPNG: sPlatLogoPNG,
  SPLAT: sPlatLogo,
  PBOND: pBondLogo,
  WFTM: wftmLogo,
  BOO: booLogo,
  SHIBA: shibaLogo,
  USDC: zooLogo,
  'PLAT-FTM-LP': platFtmLpLogo,
  'SPLAT-FTM-LP': splatFtmLpLogo,
  'SPLAT-PLAT-LP': splatFtmLpLogo,

};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, size = 64 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;
