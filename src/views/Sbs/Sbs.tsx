import React, { /*useCallback, useEffect, */useMemo, useState } from 'react';
import Page from '../../components/Page';
import PitImage from '../../assets/img/pit.png';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import PageHeader from '../../components/PageHeader';
import { Box,/* Paper, Typography,*/ Button, Grid } from '@material-ui/core';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import usePlatFinance from '../../hooks/usePlatFinance';
import { getDisplayBalance/*, getBalance*/ } from '../../utils/formatBalance';
import { BigNumber/*, ethers*/ } from 'ethers';
import useSwapPBondToSPlat from '../../hooks/SPlatSwapper/useSwapPBondToSPlat';
import useApprove, { ApprovalState } from '../../hooks/useApprove';
import useSPlatSwapperStats from '../../hooks/SPlatSwapper/useSPlatSwapperStats';
import TokenInput from '../../components/TokenInput';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import TokenSymbol from '../../components/TokenSymbol';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${PitImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const Sbs: React.FC = () => {
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const platFinance = usePlatFinance();
  const [pbondAmount, setPbondAmount] = useState('');
  const [splatAmount, setSplatAmount] = useState('');

  const [approveStatus, approve] = useApprove(platFinance.PBOND, platFinance.contracts.SPlatSwapper.address);
  const { onSwapSPlat } = useSwapPBondToSPlat();
  const splatSwapperStat = useSPlatSwapperStats(account);

  const splatBalance = useMemo(() => (splatSwapperStat ? Number(splatSwapperStat.splatBalance) : 0), [splatSwapperStat]);
  const bondBalance = useMemo(() => (splatSwapperStat ? Number(splatSwapperStat.pbondBalance) : 0), [splatSwapperStat]);

  const handlePBondChange = async (e: any) => {
    if (e.currentTarget.value === '') {
      setPbondAmount('');
      setSplatAmount('');
      return
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setPbondAmount(e.currentTarget.value);
    const updateSPlatAmount = await platFinance.estimateAmountOfSPlat(e.currentTarget.value);
    setSplatAmount(updateSPlatAmount);  
  };

  const handlePBondSelectMax = async () => {
    setPbondAmount(String(bondBalance));
    const updateSPlatAmount = await platFinance.estimateAmountOfSPlat(String(bondBalance));
    setSplatAmount(updateSPlatAmount); 
  };

  const handleSPlatSelectMax = async () => {
    setSplatAmount(String(splatBalance));
    const rateSPlatPerPlat = (await platFinance.getSPlatSwapperStat(account)).rateSPlatPerPlat;
    const updatePBondAmount = ((BigNumber.from(10).pow(30)).div(BigNumber.from(rateSPlatPerPlat))).mul(Number(splatBalance) * 1e6);
    setPbondAmount(getDisplayBalance(updatePBondAmount, 18, 6));
  };

  const handleSPlatChange = async (e: any) => {
    const inputData = e.currentTarget.value;
    if (inputData === '') {
      setSplatAmount('');
      setPbondAmount('');
      return
    }
    if (!isNumeric(inputData)) return;
    setSplatAmount(inputData);
    const rateSPlatPerPlat = (await platFinance.getSPlatSwapperStat(account)).rateSPlatPerPlat;
    const updatePBondAmount = ((BigNumber.from(10).pow(30)).div(BigNumber.from(rateSPlatPerPlat))).mul(Number(inputData) * 1e6);
    setPbondAmount(getDisplayBalance(updatePBondAmount, 18, 6));
  }

  return (
    <Switch>
      <Page>
        <BackgroundImage />
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader icon={'🏦'} title="PBond -> SPlat Swap" subtitle="Swap PBond to SPlat" />
            </Route>
            <Box mt={5}>
              <Grid container justify="center" spacing={6}>
                <StyledBoardroom>
                  <StyledCardsWrapper>
                    <StyledCardWrapper>
                      <Card>
                        <CardContent>
                          <StyledCardContentInner>
                            <StyledCardTitle>PBonds</StyledCardTitle>
                            <StyledExchanger>
                              <StyledToken>
                                <StyledCardIcon>
                                  <TokenSymbol symbol={platFinance.PBOND.symbol} size={54} />
                                </StyledCardIcon>
                              </StyledToken>
                            </StyledExchanger>
                            <Grid item xs={12}>
                              <TokenInput
                                onSelectMax={handlePBondSelectMax}
                                onChange={handlePBondChange}
                                value={pbondAmount}
                                max={bondBalance}
                                symbol="PBond"
                              ></TokenInput>
                            </Grid>
                            <StyledDesc>{`${bondBalance} PBOND Available in Wallet`}</StyledDesc>
                          </StyledCardContentInner>
                        </CardContent>
                      </Card>
                    </StyledCardWrapper>
                    <Spacer size="lg"/>
                    <StyledCardWrapper>
                      <Card>
                        <CardContent>
                          <StyledCardContentInner>
                            <StyledCardTitle>SPlat</StyledCardTitle>
                            <StyledExchanger>
                              <StyledToken>
                                <StyledCardIcon>
                                  <TokenSymbol symbol={platFinance.SPLAT.symbol} size={54} />
                                </StyledCardIcon>
                              </StyledToken>
                            </StyledExchanger>
                            <Grid item xs={12}>
                              <TokenInput
                                onSelectMax={handleSPlatSelectMax}
                                onChange={handleSPlatChange}
                                value={splatAmount}
                                max={splatBalance}
                                symbol="SPlat"
                              ></TokenInput>
                            </Grid>
                            <StyledDesc>{`${splatBalance} SPLAT Available in Swapper`}</StyledDesc>
                          </StyledCardContentInner>
                        </CardContent>
                      </Card>
              
                    </StyledCardWrapper>
                  </StyledCardsWrapper>
                </StyledBoardroom>
              </Grid>
            </Box>

            <Box mt={5}>
              <Grid container justify="center">
                <Grid item xs={8}>
                  <Card>
                    <CardContent>
                      <StyledApproveWrapper>
                      {approveStatus !== ApprovalState.APPROVED ? (
                        <Button
                          disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                          color="primary"
                          variant="contained"
                          onClick={approve}
                          size="medium"
                        >
                          Approve PBOND
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => onSwapSPlat(pbondAmount.toString())}
                          size="medium"
                        >
                          Swap
                        </Button>
                      )}
                      </StyledApproveWrapper>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledApproveWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`;
const StyledCardTitle = styled.div`
  align-items: center;
  display: flex;
  font-size: 20px;
  font-weight: 700;
  height: 64px;
  justify-content: center;
  margin-top: ${(props) => -props.theme.spacing[3]}px;
`;

const StyledCardIcon = styled.div`
  background-color: ${(props) => props.theme.color.grey[900]};
  width: 72px;
  height: 72px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledExchanger = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[5]}px;
`;

const StyledToken = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledDesc = styled.span``;

export default Sbs;
