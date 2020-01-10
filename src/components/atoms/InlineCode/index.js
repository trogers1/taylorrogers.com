import React from 'react';
import styled from 'styled-components';

import { codeBackgroundDarkBlue, codeBorderMutedPurple, mutedYellow } from 'helpers/colors';

const StyledInlineCode = styled.code`
  color: ${mutedYellow};
  background: ${codeBackgroundDarkBlue};
  border: 0.2px ${codeBorderMutedPurple} solid;
  border-radius: 0.2rem;
  padding: 0 0.5rem 0 0.5rem;
`;

export default ({ children }) => {
  return <StyledInlineCode>{children}</StyledInlineCode>;
};
