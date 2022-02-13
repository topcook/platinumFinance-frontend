import React from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Bank from '../Bank';

import { Box, Container, Typography, Grid } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import FarmCard from './FarmCard';
import FarmImage from '../../assets/img/farm.png';
import { createGlobalStyle } from 'styled-components';
import LaunchCountdown from '../../components/LaunchCountdown';

import useBanks from '../../hooks/useBanks';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${FarmImage}) no-repeat !important;
    background-size: cover !important;
  }
`;
const date = new Date('2022-2-9 18:00:00Z');

const Farm = () => {
  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const activeBanks = banks.filter((bank) => !bank.finished);
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <BackgroundImage />
          {!!account ? (
            <Container maxWidth="lg">
              <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
                Farm
              </Typography>
{/*               <LaunchCountdown deadline={date} description={'Raffle ends in'} descriptionLink={''}></LaunchCountdown>
 */}
             {<Alert style={{ backgroundColor:"white" , color:"black"}}variant="filled" severity="warning">
              <b>Strategy:<br/>
              For the health and longevity of our protocol, we recommend you to:<br/>
               A) Re-invest your earned SPLAT in SPLAT-FTM LP to earn MORE SPLAT! <br/>
               B) Re-invest your earned SPLAT in Staking page to earn MORE PLAT!</b>
            </Alert> }  
              <Box mt={5}>
                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 2).length === 0}>
                  <Typography color="textPrimary" variant="h4" gutterBottom>
                    Earn SPLAT by staking LP
                  </Typography>
                  <Grid container spacing={3}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 2)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <FarmCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>

                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 1).length === 0}>
                  <Typography color="textPrimary" variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    Earn PLAT by staking LP
                  </Typography>
                  <Alert variant="filled" severity="warning">
                    All below pools have ended. Please unstake and collect your rewards.
                  </Alert>
                  <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 1)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <FarmCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>

                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 0).length === 0}>
                  <Typography color="textPrimary" variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    Genesis Pools Ended - <br/>Please Withdraw your Funds and stake them into PLAT-FTM-LP
                    <h5>Both pools are subject to 1% deposit fee</h5>
                  </Typography>
                  <Alert style={{ backgroundColor:"white" , color:"black"}}variant="filled" severity="warning">
              <b>Strategy: Our PLAT-FTM Liquidity Pool starts on Tuesday, 8 February 2022 18:00:00 UTC!<br/> 
              We recommend you provide LP with FTM & your earned PLAT from Genesis Pool to earn MORE SPLAT.</b>
            </Alert>
                  <Grid container spacing={3}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 0)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <FarmCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>
              </Box>
            </Container>
          ) : (
            <UnlockWallet />
          )}
        </Route>
        <Route path={`${path}/:bankId`}>
          <BackgroundImage />
          <Bank />
        </Route>
      </Page>
    </Switch>
  );
};

export default Farm;
