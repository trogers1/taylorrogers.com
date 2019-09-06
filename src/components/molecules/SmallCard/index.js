import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { cardBackground, yellow } from 'helpers/colors';

const Card = styled(Link)`
  background: ${cardBackground};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  height: 30rem;
  margin: 2rem;
  padding: 2rem;
  text-decoration: none;
  width: 25rem;
`;

const CardTitle = styled.h3`
  color: ${yellow};
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
`;

const CardBody = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: 300;
  flex-grow: 2;
  overflow-y: hidden;
`;

export default ({ title, body, to }) => (
  <Card to={to}>
    <CardTitle>{title}</CardTitle>
    <CardBody>{body}</CardBody>
  </Card>
);
