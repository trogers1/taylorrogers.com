import React from 'react';
import styled from 'styled-components';

import { mutedDarkBlue, mutedPink } from 'helpers/colors';

const StyledBlockQuote = styled.blockquote`
  background: ${mutedDarkBlue};
  padding: 1rem 2rem;
  margin: 1rem 0 1rem 1rem;
`;

const BlockQuoteWrapper = styled.div`
  width: auto;
  background: ${mutedPink};
`;

export default ({ children }) => (
  <BlockQuoteWrapper>
    <StyledBlockQuote>{children}</StyledBlockQuote>
  </BlockQuoteWrapper>
);
