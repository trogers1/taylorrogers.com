import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import CircleButton from '../components/atoms/CircleButton';

import { mutedBlue, mutedPink, mutedOrange, codeBorderMutedPurple } from '../helpers/colors';

const Centered = styled.div`
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const SplashPage = () => {
  return (
    <>
      <Head>
        <title>Welcome to TaylorRogers.com</title>
        <link rel="icon" href="/sun.svg" />
      </Head>
      <Centered>
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
