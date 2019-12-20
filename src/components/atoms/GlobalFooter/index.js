import React from 'react';
import styled from 'styled-components';

import { mutedYellow, siteBackground } from 'helpers/colors';

import ExternalLink from 'components/atoms/ExternalLink';

const Footer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  background: ${siteBackground};
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);

  width: 100%;
  box-sizing: border-box;
  height: auto;
  display: flex;
  flex-direction: column;

  align-items: center;
  padding: 0 2rem;
  color: ${mutedYellow};
  font-size: 1.1rem;

  @media (min-width: 800px) {
    height: 2rem;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const LeftItems = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 100%;

  @media (min-width: 800px) {
    flex-direction: row;
    justify-content: space-between;

    margin-bottom: 1rem;
    margin-top: 1.5rem;
    width: unset;
  }
`;

const GlobalFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Footer>
      <LeftItems>
        <div>&copy; Copyright {currentYear}. All Rights Reserved.</div>
      </LeftItems>
      <div>
        <ExternalLink url="http://github.com/trogers1">Go to Taylor&apos;s GitHub</ExternalLink>
      </div>
    </Footer>
  );
};

export default GlobalFooter;
