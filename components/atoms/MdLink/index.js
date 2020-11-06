import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { mutedBlue } from 'helpers/colors';

import ExternalLink from 'components/atoms/ExternalLink';

const StyledLink = styled(Link)`
  color: ${mutedBlue};
`;

export default ({ children, location, href }) => {
  if (href.startsWith('#')) {
    return <StyledLink to={`${location.pathname}${href}`}>{children}</StyledLink>;
  } else {
    return <ExternalLink url={href}>{children}</ExternalLink>;
  }
};
