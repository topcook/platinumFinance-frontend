import React, { useMemo, useState } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import HomeImage from '../../assets/img/home.png';
import useLpStats from '../../hooks/useLpStats';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import usePlatStats from '../../hooks/usePlatStats';
import TokenInput from '../../components/TokenInput';
import usePlatFinance from '../../hooks/usePlatFinance';
import { useWallet } from 'use-wallet';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';
import useApproveTaxOffice from '../../hooks/useApproveTaxOffice';
import { ApprovalState } from '../../hooks/useApprove';
import useProvidePlatFtmLP from '../../hooks/useProvidePlatFtmLP';
import { Alert } from '@material-ui/lab';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const ProvideLiquidity = () => {
  const [platAmount, setPlatAmount] = useState(0);
  const [ftmAmount, setFtmAmount] = useState(0);
  const [lpTokensAmount, setLpTokensAmount] = useState(0);
  const { balance } = useWallet();
  const platStats = usePlatStats();
  const platFinance = usePlatFinance();
  const [approveTaxOfficeStatus, approveTaxOffice] = useApproveTaxOffice();
  const platBalance = useTokenBalance(platFinance.PLAT);
  const ftmBalance = (balance / 1e18).toFixed(4);
  const { onProvidePlatFtmLP } = useProvidePlatFtmLP();
  const platFtmLpStats = useLpStats('PLAT-FTM-LP');

  const platLPStats = useMemo(() => (platFtmLpStats ? platFtmLpStats : null), [platFtmLpStats]);
  const platPriceInFTM = useMemo(() => (platStats ? Number(platStats.tokenInFtm).toFixed(2) : null), [platStats]);
  const ftmPriceInPLAT = useMemo(() => (platStats ? Number(1 / platStats.tokenInFtm).toFixed(2) : null), [platStats]);
  // const classes = useStyles();

  const handlePlatChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setPlatAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setPlatAmount(e.currentTarget.value);
    const quoteFromSpooky = await platFinance.quoteFromSpooky(e.currentTarget.value, 'PLAT');
    setFtmAmount(quoteFromSpooky);
    setLpTokensAmount(quoteFromSpooky / platLPStats.ftmAmount);
  };

  const handleFtmChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setFtmAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setFtmAmount(e.currentTarget.value);
    const quoteFromSpooky = await platFinance.quoteFromSpooky(e.currentTarget.value, 'FTM');
    setPlatAmount(quoteFromSpooky);

    setLpTokensAmount(quoteFromSpooky / platLPStats.tokenAmount);
  };
  const handlePlatSelectMax = async () => {
    const quoteFromSpooky = await platFinance.quoteFromSpooky(getDisplayBalance(platBalance), 'PLAT');
    setPlatAmount(getDisplayBalance(platBalance));
    setFtmAmount(quoteFromSpooky);
    setLpTokensAmount(quoteFromSpooky / platLPStats.ftmAmount);
  };
  const handleFtmSelectMax = async () => {
    const quoteFromSpooky = await platFinance.quoteFromSpooky(ftmBalance, 'FTM');
    setFtmAmount(ftmBalance);
    setPlatAmount(quoteFromSpooky);
    setLpTokensAmount(ftmBalance / platLPStats.ftmAmount);
  };
  return (
    <Page>
      <BackgroundImage />
      <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
        Provide Liquidity
      </Typography>

      <Grid container justify="center">
        <Box style={{ width: '600px' }}>
          <Alert variant="filled" severity="warning" style={{ marginBottom: '10px' }}>
            <b>This and <a href="https://spookyswap.finance/"  rel="noopener noreferrer" target="_blank">Spookyswap</a> are the only ways to provide Liquidity on PLAT-FTM pair without paying tax.</b>
          </Alert>
          <Grid item xs={12} sm={12}>
            <Paper>
              <Box mt={4}>
                <Grid item xs={12} sm={12} style={{ borderRadius: 15 }}>
                  <Box p={4}>
                    <Grid container>
                      <Grid item xs={12}>
                        <TokenInput
                          onSelectMax={handlePlatSelectMax}
                          onChange={handlePlatChange}
                          value={platAmount}
                          max={getDisplayBalance(platBalance)}
                          symbol={'PLAT'}
                        ></TokenInput>
                      </Grid>
                      <Grid item xs={12}>
                        <TokenInput
                          onSelectMax={handleFtmSelectMax}
                          onChange={handleFtmChange}
                          value={ftmAmount}
                          max={ftmBalance}
                          symbol={'FTM'}
                        ></TokenInput>
                      </Grid>
                      <Grid item xs={12}>
                        <p>1 PLAT = {platPriceInFTM} FTM</p>
                        <p>1 FTM = {ftmPriceInPLAT} PLAT</p>
                        <p>LP tokens ≈ {lpTokensAmount.toFixed(2)}</p>
                      </Grid>
                      <Grid xs={12} justifyContent="center" style={{ textAlign: 'center' }}>
                        {approveTaxOfficeStatus === ApprovalState.APPROVED ? (
                          <Button
                            variant="contained"
                            onClick={() => onProvidePlatFtmLP(ftmAmount.toString(), platAmount.toString())}
                            color="primary"
                            style={{ margin: '0 10px', color: '#fff' }}
                          >
                            Supply
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() => approveTaxOffice()}
                            color="secondary"
                            style={{ margin: '0 10px' }}
                          >
                            Approve
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Grid>
    </Page>
  );
};

export default ProvideLiquidity;
