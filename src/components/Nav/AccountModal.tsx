import React, { useMemo } from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';

import Label from '../Label';
import Modal, { ModalProps } from '../Modal';
import ModalTitle from '../ModalTitle';
import usePlatFinance from '../../hooks/usePlatFinance';
import TokenSymbol from '../TokenSymbol';

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const platFinance = usePlatFinance();

  const platBalance = useTokenBalance(platFinance.PLAT);
  const displayPlatBalance = useMemo(() => getDisplayBalance(platBalance), [platBalance]);

  const splatBalance = useTokenBalance(platFinance.SPLAT);
  const displaySplatBalance = useMemo(() => getDisplayBalance(splatBalance), [splatBalance]);

  const pbondBalance = useTokenBalance(platFinance.PBOND);
  const displayPbondBalance = useMemo(() => getDisplayBalance(pbondBalance), [pbondBalance]);

  return (
    <Modal>
      <ModalTitle text="My Wallet" />

      <Balances>
        <StyledBalanceWrapper>
          <TokenSymbol symbol="PLAT" />
          <StyledBalance>
            <StyledValue>{displayPlatBalance}</StyledValue>
            <Label text="PLAT Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="SPLAT" />
          <StyledBalance>
            <StyledValue>{displaySplatBalance}</StyledValue>
            <Label text="SPLAT Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="PBOND" />
          <StyledBalance>
            <StyledValue>{displayPbondBalance}</StyledValue>
            <Label text="PBOND Available" />
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>
    </Modal>
  );
};

const StyledValue = styled.div`
  //color: ${(props) => props.theme.color.grey[300]};
  font-size: 30px;
  font-weight: 700;
`;

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 ${(props) => props.theme.spacing[3]}px;
`;

export default AccountModal;
