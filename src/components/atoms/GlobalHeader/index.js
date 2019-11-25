import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { mutedYellow } from 'helpers/colors';

const HeaderText = styled(Link)`
  color: ${mutedYellow};
  font-size: 3rem;
  font-weight: 900;
  font-style: italic;
  letter-spacing: 0.25rem;
  margin-right: 1rem;
  text-decoration: none;
  @media screen and (min-width: 800px) {
    margin-left: 0.5rem;
  }
`;

const StyledDiv = styled.header`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  font-size: 1.2rem;
  height: 3rem;
  left: 0;
  justify-content: flex-end;
  top: 0;
  position: absolute;
  width: 100%;
  @media screen and (min-width: 800px) {
    font-size: 0.85rem;
    height: 6rem;
    justify-content: flex-start;
  }
`;

const GlobalHeader = () => {
  return (
    <StyledDiv>
      <HeaderText aria-label="Taylor-Rogers.com" to="/">
        Taylor-Rogers.com
      </HeaderText>
    </StyledDiv>
  );
};

export default GlobalHeader;
