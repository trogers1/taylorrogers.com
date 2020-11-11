import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import CircleButton from 'components/atoms/CircleButton';
import EightiesLogo from 'public/80sLogo.svg';
import TypewriterLogo from 'public/typewriterLogo_Full.svg';

import { mutedBlue, mutedPink, mutedOrange } from '../helpers/colors';

const isDarkTheme = () => Math.round(Math.random() * 1000) % 2 === 1;

const Centered = styled.div`
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Logo = styled(isDarkTheme ? EightiesLogo : TypewriterLogo)`
  height: 45rem;
  max-width: 100%;
  width: auto;
`;

const Row = styled.div`
  width: 100%;
`;

const SplashPage = () => {
  return (
    <>
      <Head>
        <title>Welcome to TaylorRogers.com</title>
        <link rel="icon" href="/sun.svg" />
      </Head>
      <Centered>
        <Row>
          <Centered>
            <Logo alt="Synthwave TaylorRogers.com Site Logo" />
          </Centered>
        </Row>
        <CircleButton color={mutedBlue} href="/dev">
          Developer Tutorials
        </CircleButton>
        <CircleButton color={mutedPink} href="/essays">
          Blog
        </CircleButton>
        <CircleButton color={mutedOrange} href="/about">
          About
        </CircleButton>
      </Centered>
    </>
  );
};

export default SplashPage;
