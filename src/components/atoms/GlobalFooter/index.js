import React from 'react';
import styled from 'styled-components';

import ExternalLink from 'components/atoms/ExternalLink';

const Footer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  height: 8rem;
  display: flex;
  flex-direction: column;

  align-items: center;
  background: black;
  padding: 0 2rem;
  color: white;
  font-size: 1.1rem;

  @media (min-width: 800px) {
    height: 5rem;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const LeftItems = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 1rem;

  @media (min-width: 800px) {
    margin: 0;
    width: 36rem;
    flex-direction: row;
    justify-content: space-between;
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
