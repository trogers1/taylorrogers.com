import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import colors from 'helpers/colors';

const StyledLink = styled(Link)`
  all: unset;
  color: ${colors.mutedOrange};
  :hover {
    cursor: pointer;
  }
`;

export default ({ children, id, location, headerType }) => {
  return (
    <StyledLink id={id} to={`${location.pathname}#${id}`}>
      {headerType === 'h2' ? <h2 style={{ display: 'inline-block' }}>{children}</h2> : null}
      {headerType === 'h3' ? <h3 style={{ display: 'inline-block' }}>{children}</h3> : null}
      {headerType === 'h4' ? <h4 style={{ display: 'inline-block' }}>{children}</h4> : null}
      {headerType === 'h5' ? <h5 style={{ display: 'inline-block' }}>{children}</h5> : null}
      {headerType === 'h6' ? <h6 style={{ display: 'inline-block' }}>{children}</h6> : null}
    </StyledLink>
  );
};
