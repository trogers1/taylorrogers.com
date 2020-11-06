import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import colors from 'helpers/colors';

const Circle = styled.a`
  background: ${props => props.color || colors.mutedOrange};
  border-radius: 50%;
  color: ${colors.yellow};
  font-size: 1.6rem;
  font-weight: 600;
  width: 15rem;
  height: 15rem;
  :hover {
    cursor: pointer;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem;
  text-decoration: none;
`;

const FlexContainer = styled.div`
  word-break: break-word;
  margin: 2rem;
  text-align: center;
`;

export default ({ children, href, color, ...rest }) => {
  return (
    <Link href={href}>
      <Circle color={color}>
        <FlexContainer>{children}</FlexContainer>
      </Circle>
    </Link>
  );
};
