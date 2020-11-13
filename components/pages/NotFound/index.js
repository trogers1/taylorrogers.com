import React from 'react';
import styled from 'styled-components';

import { textGrey } from 'helpers/colors';

import HeadingLarge from 'components/atoms/HeadingLarge';
import InternalLink from 'components/atoms/InternalLink';

const Centered = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.8em;
  color: ${textGrey};
  > * {
    margin: 2rem 0;
  }
`;

const HomePage = () => {
  return (
    <Centered>
      <HeadingLarge>Not Found</HeadingLarge>
      Uh oh! The page you are looking for was not found.
      <InternalLink href="/">Go to the Home Page</InternalLink>
    </Centered>
  );
};

export default HomePage;
