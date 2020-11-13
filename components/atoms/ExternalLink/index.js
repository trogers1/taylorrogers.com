import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { mutedBlue } from 'helpers/colors';

const StyledA = styled.a`
  color: ${mutedBlue};
`;

const ExternalLink = ({ children, href, ...rest }) => {
  // Checks if given link starts with http(s):// and appends it if not
  const fullUrl = /^(https?:\/\/)|(mailto:)/i.test(href) ? href : `https://${href}`;
  return (
    <StyledA href={fullUrl} rel="noopener noreferrer" target="_blank" {...rest}>
      {children}
    </StyledA>
  );
};

ExternalLink.propTypes = {
  children: PropTypes.any.isRequired,
  url: PropTypes.string
};

export default ExternalLink;
