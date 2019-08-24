import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import colors from 'helpers/colors';

const Circle = styled(Link)`
  background: ${colors.pink};
  border-radius: 50%;
  color: ${colors.yellow};
  font-size: 1.6rem;
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

export default ({ children, to, ...rest }) => {
  return <Circle to={to}>{children}</Circle>;
};
