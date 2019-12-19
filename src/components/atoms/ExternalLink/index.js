import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { mutedBlue } from 'helpers/colors';

const StyledA = styled.a`
  color: ${mutedBlue};
`;

const ExternalLink = ({ url, children, ...other }) => {
  return (
    <StyledA
      {...other}
      href={
        // Checks if given link starts with http(s):// and appends it if not
        /^https?:\/\//i.test(url) ? url : `http://${url}`
      }
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </StyledA>
  );
};

ExternalLink.propTypes = {
  url: PropTypes.string,
  children: PropTypes.any.isRequired
};

export default ExternalLink;
