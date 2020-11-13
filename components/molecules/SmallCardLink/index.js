import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { cardBackground, mutedYellow, textGrey } from 'helpers/colors';

const Card = styled.a`
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
  color: ${mutedYellow};
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
`;

const CardBody = styled.div`
  color: ${textGrey};
  font-size: 1.5rem;
  font-weight: 300;
  flex-grow: 2;
  overflow-y: hidden;
`;

const SmallCardLink = ({ title, previewText, href }) => (
  <Link href={href}>
    <Card>
      <CardTitle>{title}</CardTitle>
      <CardBody>{previewText}</CardBody>
    </Card>
  </Link>
);

export default SmallCardLink;
