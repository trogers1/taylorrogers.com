import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Media from 'react-media';
import Link from 'next/link';

import EightiesLogo from 'public/80sLogo.svg';

import { mutedYellow, siteBackground, hotPink, lightBlue } from 'helpers/colors';

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
  border: 0.25rem solid ${hotPink};
  box-sizing: border-box;
  ${({ shadow }: HeaderStyles) =>
    shadow ? 'box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);' : 'box-shadow: none;'}
  display: flex;
  flex-direction: row-reverse;
  font-size: 1.2rem;
  height: 3rem;
  left: 0;
  justify-content: space-between;
  top: 0;
  position: fixed;
  width: 100%;
  z-index: 10;
  @media screen and (min-width: 800px) {
    flex-direction: row;
    font-size: 1.4rem;
    height: 6rem;
    justify-content: space-between;
  }
`;

const Logo = styled<any>(EightiesLogo)`
  height: 3rem;
  max-width: 100%;
  width: auto;
  margin-left: 1rem;
  @media screen and (min-width: 800px) {
    height: 7rem;
  }
`;

const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  margin: 0 1rem;
`;

const HeaderButton = styled.div`
  background: ${lightBlue};
  border: 0.2rem solid ${hotPink};
  color: ${hotPink};
  font-weight: 900;
  margin: 0.5rem 1rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
`;

type HeaderStyles = {
  fontSize: string;
  height: string;
  shadow: boolean;
};

const GlobalHeader = () => {
  const [headerStyles, setHeaderStyles] = useState<HeaderStyles>({
    fontSize: '3rem',
    height: '3rem',
    shadow: false,
  });
  useEffect(() => {
    window.onscroll = () => {
      if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        setHeaderStyles({ ...headerStyles, shadow: true });
      } else {
        setHeaderStyles({ ...headerStyles, shadow: false });
      }
    };
  });

  return (
    <StyledDiv {...headerStyles}>
      <Link href="/">
        {/* <HeaderText aria-label="Taylor-Rogers.com">Taylor-Rogers.com</HeaderText> */}
        <a>
          <Logo alt="Synthwave TaylorRogers.com Site Logo" />
        </a>
      </Link>
      <Media
        queries={{
          mobile: '(max-width: 799px)',
          desktop: '(min-width: 800px)',
        }}
      >
        {(matches) => (
          <>
            {matches.mobile && <div>mobile</div>}
            {matches.desktop && (
              <ButtonContainer>
                <Link href="/dev">
                  <a>
                    <HeaderButton>Dev</HeaderButton>
                  </a>
                </Link>
                <Link href="/blog">
                  <a>
                    <HeaderButton>Blog</HeaderButton>
                  </a>
                </Link>
                <Link href="/about">
                  <a>
                    <HeaderButton>About</HeaderButton>
                  </a>
                </Link>
              </ButtonContainer>
            )}
          </>
        )}
      </Media>
    </StyledDiv>
  );
};

export default GlobalHeader;
