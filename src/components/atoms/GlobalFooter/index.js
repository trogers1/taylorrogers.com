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
  height: 2rem;
  display: flex;
  flex-direction: column;

  align-items: center;
  padding: 0 2rem;
  color: ${mutedYellow};
  font-size: 1.1rem;

  @media (min-width: 800px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const LeftItems = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  width: 100%;

  @media (min-width: 800px) {
    flex-direction: row;
    justify-content: space-between;
    margin: 0;
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
        <ExternalLink url="google.com">External Link</ExternalLink>
      </div>
    </Footer>
  );
};

export default GlobalFooter;
