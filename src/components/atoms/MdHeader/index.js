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
    <>
      {headerType === 'h2' ? (
        <h2>
          <StyledLink id={id} to={`${location.pathname}#${id}`}>
            {children}
          </StyledLink>
        </h2>
      ) : null}
      {headerType === 'h3' ? (
        <h3>
          <StyledLink id={id} to={`${location.pathname}#${id}`}>
            {children}
          </StyledLink>
        </h3>
      ) : null}
      {headerType === 'h4' ? (
        <h4>
          <StyledLink id={id} to={`${location.pathname}#${id}`}>
            {children}
          </StyledLink>
        </h4>
      ) : null}
      {headerType === 'h5' ? (
        <h5>
          <StyledLink id={id} to={`${location.pathname}#${id}`}>
            {children}
          </StyledLink>
        </h5>
      ) : null}
      {headerType === 'h6' ? (
        <h6>
          <StyledLink id={id} to={`${location.pathname}#${id}`}>
            {children}
          </StyledLink>
        </h6>
      ) : null}
    </>
  );
};
