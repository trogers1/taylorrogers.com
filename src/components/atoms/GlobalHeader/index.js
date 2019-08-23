import React from 'react';
import styled from 'styled-components';

const HeaderText = styled.h1`
  letter-spacing: 0.25rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
  margin-right: 1rem;
  @media screen and (min-width: 800px) {
    font-size: 1.1rem;
    margin-left: 0.5rem;
    margin-top: 1.5rem;
  }
`;

const StyledDiv = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 4.5rem;
  width: 100%;
  font-size: 1.2rem;
  background: black;
  @media screen and (min-width: 800px) {
    justify-content: flex-start;
    height: 6rem;
    font-size: 0.85rem;
  }
`;

const GlobalHeader = () => {
  return (
    <StyledDiv>
      <HeaderText aria-label="Emsi Skills Match">SKILLS MATCH</HeaderText>
    </StyledDiv>
  );
};

export default GlobalHeader;
