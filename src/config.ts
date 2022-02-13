// import { ChainId } from '@pancakeswap-libs/sdk';
import { ChainId } from '@spookyswap/sdk';
import { Configuration } from './plat-finance/config';
import { BankInfo } from './plat-finance';

const configurations: { [env: string]: Configuration } = {
  /*development / production: {
    chainId: ChainId.FTMTESTNET,
    networkName: 'Fantom Opera Testnet',
    ftmscanUrl: 'https://testnet.ftmscan.com',
    defaultProvider: 'https://rpc.testnet.fantom.network/',
    deployments: require('./plat-finance/deployments/deployments.testing.json'),
    externalTokens: {
      WFTM: ['0xf1277d1ed8ad466beddf92ef448a132661956621', 18],
      FUSDT: ['0xb7f24e6e708eabfaa9e64b40ee21a5adbffb51d6', 6],
      BOO: ['0x14f0C98e6763a5E13be5CE014d36c2b69cD94a1e', 18],
      USDC: ['0x2317610e609674e53D9039aaB85D8cAd8485A7c5', 0],
      SHIBA: ['0x39523112753956d19A3d6a30E758bd9FF7a8F3C0', 9],
      'USDT-FTM-LP': ['0xE7e3461C2C03c18301F66Abc9dA1F385f45047bA', 18],
      'PLAT-FTM-LP': ['0x13Fe199F19c8F719652985488F150762A5E9c3A8', 18],
      'SPLAT-FTM-LP': ['0x20bc90bB41228cb9ab412036F80CE4Ef0cAf1BD5', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },*/

  production: {
    chainId: ChainId.MAINNET,
    networkName: 'Fantom Opera Mainnet',
    ftmscanUrl: 'https://ftmscan.com',
    defaultProvider: 'https://rpc.ftm.tools/',
    deployments: require('./plat-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WFTM: ['0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', 18],
      FUSDT: ['0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', 6], // This is actually usdc on mainnet not fusdt
      BOO: ['0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE', 18],
      SHIBA: ['0x9ba3e4f84a34df4e08c112e1a0ff148b81655615', 9],
      'PLAT-FTM-LP': ['0x9ef3a25c3993a242c229a22c8ab5b3376809137e', 18],
      'SPLAT-FTM-LP': ['0x7abcbf6e6f6e2e70065a2bc71b11892327ea5343', 18],
      'SPLAT-PLAT-LP': ['0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c', 18],
      'USDC': ['0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', 6],
      'USDT-FTM-LP': ['0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c', 18],

    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  /*
  Explanation:
  name: description of the card
  poolId: the poolId assigned in the contract
  sectionInUI: way to distinguish in which of the 3 pool groups it should be listed
        - 0 = Single asset stake pools
        - 1 = LP asset staking rewarding PLAT
        - 2 = LP asset staking rewarding SPLAT
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
  PlatFtmRewardPool: {
    name: 'Earn PLAT by FTM',
    poolId: 0,
    sectionInUI: 0,
    contract: 'PlatFtmRewardPool',
    depositTokenName: 'WFTM',
    earnTokenName: 'PLAT',
    finished: false,
    sort: 1,
    closedForStaking: true,
  },
  PlatUsdcRewardPool: {
    name: 'Earn PLAT by USDC',
    poolId: 1,
    sectionInUI: 0,
    contract: 'PlatUsdcRewardPool',
    depositTokenName: 'USDC',
    earnTokenName: 'PLAT',
    finished: false,
    sort: 2,
    closedForStaking: true,
  },
  PlatFtmLPSPlatRewardPool: {
    name: 'Earn SPLAT by PLAT-FTM LP',
    poolId: 0,
    sectionInUI: 2,
    contract: 'PlatFtmLPSPlatRewardPool',
    depositTokenName: 'PLAT-FTM-LP',
    earnTokenName: 'SPLAT',
    finished: false,
    sort: 3,
    closedForStaking: false,
  },
  SplatFtmLPSPlatRewardPool: {
    name: 'Earn SPLAT by SPLAT-FTM LP',
    poolId: 1,
    sectionInUI: 2,
    contract: 'SplatFtmLPSPlatRewardPool',
    depositTokenName: 'SPLAT-FTM-LP',
    earnTokenName: 'SPLAT',
    finished: false,
    sort: 4,
    closedForStaking: false,
  },
  SplatPlatLPSPlatRewardPool: {
    name: 'Earn SPLAT by SPLAT-PLAT LP',
    poolId: 3,
    sectionInUI: 2,
    contract: 'SplatPlatLPSPlatRewardPool',
    depositTokenName: 'SPLAT-PLAT-LP',
    earnTokenName: 'SPLAT',
    finished: true,
    sort: 5,
    closedForStaking: true,
  },
};

export default configurations[process.env.NODE_ENV || 'development'];
