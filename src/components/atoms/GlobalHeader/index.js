import React from 'react';
import styled from 'styled-components';

import { pink, yellow } from 'helpers/colors';

const HeaderText = styled.h1`
  letter-spacing: 0.25rem;
  font-size: 4rem;
  font-weight: 900;
  font-style: italic;
  color: ${yellow};
  margin-right: 1rem;
  @media screen and (min-width: 800px) {
    font-size: 4rem;
    margin-left: 0.5rem;
    margin-top: 1.5rem;
  }
`;

const StyledDiv = styled.header`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 4.5rem;
  width: 100%;
  font-size: 1.2rem;
  background: ${pink};
  @media screen and (min-width: 800px) {
    justify-content: flex-start;
    height: 6rem;
    font-size: 0.85rem;
  }
`;

const GlobalHeader = () => {
  return (
    <StyledDiv>
      <HeaderText aria-label="Emsi Skills Match">Taylor-Rogers.com</HeaderText>
    </StyledDiv>
  );
};

export default GlobalHeader;
