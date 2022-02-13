import React, { useMemo } from 'react';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/home.png';
import CashImage from '../../assets/img/crypto_plat_cash.svg';
import Image from 'material-ui-image';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import usePlatStats from '../../hooks/usePlatStats';
import useLpStats from '../../hooks/useLpStats';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usesPlatStats from '../../hooks/usesPlatStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { plat as platTesting, sPlat as sPlatTesting } from '../../plat-finance/deployments/deployments.testing.json';
import { plat as platProd, sPlat as sPlatProd } from '../../plat-finance/deployments/deployments.mainnet.json';
import LaunchCountdown from '../../components/LaunchCountdown';

import MetamaskFox from '../../assets/img/metamask-fox.svg';

import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import usePlatFinance from '../../hooks/usePlatFinance';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const platFtmLpStats = useLpStats('PLAT-FTM-LP');
  const sPlatFtmLpStats = useLpStats('SPLAT-FTM-LP');
  const platStats = usePlatStats();
  const sPlatStats = usesPlatStats();
  const pBondStats = useBondStats();
  const platFinance = usePlatFinance();

  let plat;
  let sPlat;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    plat = platTesting;
    sPlat = sPlatTesting;
  } else {
    plat = platProd;
    sPlat = sPlatProd;
  }
  const date = new Date('2022-2-9 18:00:00Z');

  const buyPlatAddress = 'https://spookyswap.finance/swap?outputCurrency=' + plat.address;
  const buySPlatAddress = 'https://spookyswap.finance/swap?outputCurrency=' + sPlat.address;
  const platChartAddress = 'https://dexscreener.com/fantom/' + plat.address;
  const sPlatChartAddress = 'https://dexscreener.com/fantom/' + sPlat.address;

  const platLPStats = useMemo(() => (platFtmLpStats ? platFtmLpStats : null), [platFtmLpStats]);
  const splatLPStats = useMemo(() => (sPlatFtmLpStats ? sPlatFtmLpStats : null), [sPlatFtmLpStats]);
  const platPriceInDollars = useMemo(
    () => (platStats ? Number(platStats.priceInDollars).toFixed(2) : null),
    [platStats],
  );
  const platPriceInFTM = useMemo(() => (platStats ? Number(platStats.tokenInFtm).toFixed(4) : null), [platStats]);
  const platCirculatingSupply = useMemo(() => (platStats ? String(platStats.circulatingSupply) : null), [platStats]);
  const platTotalSupply = useMemo(() => (platStats ? String(platStats.totalSupply) : null), [platStats]);

  const sPlatPriceInDollars = useMemo(
    () => (sPlatStats ? Number(sPlatStats.priceInDollars).toFixed(2) : null),
    [sPlatStats],
  );
  const sPlatPriceInFTM = useMemo(
    () => (sPlatStats ? Number(sPlatStats.tokenInFtm).toFixed(4) : null),
    [sPlatStats],
  );
  const sPlatCirculatingSupply = useMemo(
    () => (sPlatStats ? String(sPlatStats.circulatingSupply) : null),
    [sPlatStats],
  );
  const sPlatTotalSupply = useMemo(() => (sPlatStats ? String(sPlatStats.totalSupply) : null), [sPlatStats]);

  const pBondPriceInDollars = useMemo(
    () => (pBondStats ? Number(pBondStats.priceInDollars).toFixed(2) : null),
    [pBondStats],
  );
  const pBondPriceInFTM = useMemo(() => (pBondStats ? Number(pBondStats.tokenInFtm).toFixed(4) : null), [pBondStats]);
  const pBondCirculatingSupply = useMemo(
    () => (pBondStats ? String(pBondStats.circulatingSupply) : null),
    [pBondStats],
  );
  const pBondTotalSupply = useMemo(() => (pBondStats ? String(pBondStats.totalSupply) : null), [pBondStats]);

  const platLpZap = useZap({ depositTokenName: 'PLAT-FTM-LP' });
  const splatLpZap = useZap({ depositTokenName: 'SPLAT-FTM-LP' });

  const StyledLink = styled.a`
    font-weight: 700;
    text-decoration: none;
  `;

  /* const [onPresentPlatZap, onDissmissPlatZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        platLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissPlatZap();
      }}
      tokenName={'PLAT-FTM-LP'}
    />,
  ); */

  const [onPresentSplatZap, onDissmissSplatZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        splatLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissSplatZap();
      }}
      tokenName={'SPLAT-FTM-LP'}
    />,
  );

  


  return (
    <Page>
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* Logo */}
        <Grid container item xs={12} sm={4} justify="center">
          {/* <Paper>xs=6 sm=3</Paper> */}
          <Image color="none" style={{ width: '300px', paddingTop: '0px' }} src={CashImage} />
        </Grid>
        {/* Explanation text */}
        <Grid item xs={12} sm={8}>
          <Paper>
            <Box p={4}>
              <h2> Welcome to Platinum Finance </h2>
              <p>The most luxurious algorithmic stablecoin on Fantom, pegged to the price of 1 FTM via seigniorage.</p>
              <p>
              Stake your PLAT-FTM LP in the Farm to earn SPLAT rewards. 
              Then stake your earned SPLAT in the Staking to earn more PLAT!
              </p>
              <h3>The SPLAT-FTM-LP is LIVE !</h3>
                
            </Box>
          </Paper>



        </Grid>

        <Grid container spacing={3}>
    <Grid item  xs={12} sm={12} justify="center"  style={{margin: '12px', display: 'flex' }}>
            <Alert style={{ backgroundColor:"white" , color:"black"}}variant="filled" severity="warning">
              <b>DYOR before investing. Please note that investing in Defi Project may contain risk and result in monetary loss.<br/>
              By using our protocol, you agreed that our team is not responsible for any financial losses from investing in our protocol.</b>
            </Alert>

        </Grid>
        {/* <LaunchCountdown deadline={date} description={'Raffle ends in'} descriptionLink={''}></LaunchCountdown> */}
        </Grid>


        {/* TVL */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center">
              <h2>Total Value Locked</h2>
              <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" />
            </CardContent>
          </Card>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={8}>
          <Card style={{ height: '100%' }}>
            <CardContent align="center" style={{ marginTop: '2.5%' }}>
              {/* <h2 style={{ marginBottom: '20px' }}>Wallet Balance</h2> */}
              <Button color="primary" href="/farm" variant="contained" style={{ marginRight: '10px' }}>
                Farm Now
              </Button>
              <Button color="primary" href="/staking" variant="contained" style={{ marginRight: '10px' }}>
                Stake Now
              </Button>
              <Button
                color="primary"
                target="_blank"
                href={buyPlatAddress}
                variant="contained"
                style={{ marginRight: '10px' }}
                className={classes.button}
              >
                Buy PLAT
              </Button>
              <Button color="primary" style={{ marginRight: '10px' }} variant="contained" target="_blank" href={buySPlatAddress} className={classes.button}>
                Buy SPLAT               
              </Button>
              <Button              
                color="primary"
                target="_blank"
                href={buyPlatAddress}
                variant="contained"
                style={{ marginRight: '10px' }}
                className={classes.button}
                href={platChartAddress}              
              >
                PLAT CHART
              </Button>
              <Button              
                color="primary"
                target="_blank"
                href={buyPlatAddress}
                variant="contained"
                style={{ marginRight: '10px' }}
                className={classes.button}
                href={sPlatChartAddress}              >
                SPLAT CHART
                
              </Button>
              
            </CardContent>
          </Card>
        </Grid>

        {/* PLAT */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>PLAT</h2>
              <Button
                onClick={() => {
                  platFinance.watchAssetInMetamask('PLAT');
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="PLAT" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{platPriceInFTM ? platPriceInFTM : '-.----'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px', alignContent: 'flex-start' }}>
                  ${platPriceInDollars ? platPriceInDollars : '-.--'}
                </span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(platCirculatingSupply * platPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {platCirculatingSupply} <br />
                Total Supply: {platTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* SPLAT */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>SPLAT</h2>
              <Button
                onClick={() => {
                  platFinance.watchAssetInMetamask('SPLAT');
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="SPLAT" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{sPlatPriceInFTM ? sPlatPriceInFTM : '-.----'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${sPlatPriceInDollars ? sPlatPriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(sPlatCirculatingSupply * sPlatPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {sPlatCirculatingSupply} <br />
                Total Supply: {sPlatTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* PBOND */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>PBOND</h2>
              <Button
                onClick={() => {
                  platFinance.watchAssetInMetamask('PBOND');
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="PBOND" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{pBondPriceInFTM ? pBondPriceInFTM : '-.----'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${pBondPriceInDollars ? pBondPriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(pBondCirculatingSupply * pBondPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {pBondCirculatingSupply} <br />
                Total Supply: {pBondTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <h2>PLAT-FTM Spooky LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="PLAT-FTM-LP" />
                </CardIcon>
              </Box>
              <Box mt={2}>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {platLPStats?.tokenAmount ? platLPStats?.tokenAmount : '-.--'} PLAT /{' '}
                  {platLPStats?.ftmAmount ? platLPStats?.ftmAmount : '-.--'} FTM
                </span>
              </Box>
              <Box>${platLPStats?.priceOfOne ? platLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${platLPStats?.totalLiquidity ? platLPStats.totalLiquidity : '-.--'} <br />
                Total supply: {platLPStats?.totalSupply ? platLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <h2>SPLAT-FTM Spooky LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="SPLAT-FTM-LP" />
                </CardIcon>
              </Box>
              <Box mt={2}>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {splatLPStats?.tokenAmount ? splatLPStats?.tokenAmount : '-.--'} SPLAT /{' '}
                  {splatLPStats?.ftmAmount ? splatLPStats?.ftmAmount : '-.--'} FTM
                </span>
              </Box>
              <Box>${splatLPStats?.priceOfOne ? splatLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${splatLPStats?.totalLiquidity ? splatLPStats.totalLiquidity : '-.--'}
                <br />
                Total supply: {splatLPStats?.totalSupply ? splatLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
