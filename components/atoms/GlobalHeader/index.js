import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { mutedYellow, siteBackground } from 'helpers/colors';

const HeaderText = styled.a`
  color: ${mutedYellow};
  font-size: 3rem;
  font-weight: 900;
  font-style: italic;
  letter-spacing: 0.25rem;
  margin-right: 1rem;
  text-decoration: none;
  transition: 0.2s;
  @media screen and (min-width: 800px) {
    margin-left: 0.5rem;
  }
`;

const StyledDiv = styled.header`
  align-items: center;
  background: ${siteBackground};
  box-sizing: border-box;
  ${({ shadow }) => (shadow ? 'box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);' : 'box-shadow: none;')}
  display: flex;
  font-size: 1.2rem;
  height: 3rem;
  left: 0;
  justify-content: flex-end;
  top: 0;
  position: fixed;
  width: 100%;
  z-index: 10;
  @media screen and (min-width: 800px) {
    font-size: 0.85rem;
    height: 6rem;
    justify-content: flex-start;
  }
`;

const GlobalHeader = () => {
  const [headerStyles, setHeaderStyles] = useState({
    fontSize: '3rem',
    height: '3rem',
    shadow: false
  });
  window.onscroll = () => {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      setHeaderStyles({ ...headerStyles, shadow: true });
    } else {
      setHeaderStyles({ ...headerStyles, shadow: false });
    }
  };

  return (
    <StyledDiv {...headerStyles}>
      <Link href="/">
        <HeaderText aria-label="Taylor-Rogers.com">Taylor-Rogers.com</HeaderText>
      </Link>
    </StyledDiv>
  );
};

export default GlobalHeader;
