import React from 'react';
import styled from 'styled-components';

import { pink, yellow } from 'helpers/colors';

const LargeHeader = styled.div`
  color: ${yellow};
  border-bottom: 0.5rem solid ${pink};
  font-size: 4rem;
  font-style: italic;
  font-weight: 900;
  padding: 2rem;
  padding-bottom: 0;
  margin: 1rem;
`;

const FlexWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default ({ children }) => (
  <FlexWrapper>
    <LargeHeader>{children}</LargeHeader>
  </FlexWrapper>
);
