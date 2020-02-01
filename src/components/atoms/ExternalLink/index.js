import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { mutedBlue } from 'helpers/colors';

const StyledA = styled.a`
  color: ${mutedBlue};
`;

const ExternalLink = ({ url, children, ...other }) => {
  // Checks if given link starts with http(s):// and appends it if not
  const fullUrl = /^(https?:\/\/)|(mailto:)/i.test(url) ? url : `http://${url}`;
  return (
    <StyledA {...other} href={fullUrl} rel="noopener noreferrer" target="_blank">
      {children}
    </StyledA>
  );
};

ExternalLink.propTypes = {
  url: PropTypes.string,
  children: PropTypes.any.isRequired,
  isEmail: PropTypes.bool
};

export default ExternalLink;
