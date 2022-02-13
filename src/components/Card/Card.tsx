import React from 'react';
import styled from 'styled-components';

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>;

const StyledCard = styled.div`
  background-color: rgb(56 56 56 / 90%); //${(props) => props.theme.color.grey[800]};
  color: #ffffff !important;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default Card;
