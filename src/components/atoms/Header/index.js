import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import colors from 'helpers/colors';

const StyledLink = styled(Link)`
  all: unset;
  color: ${colors.mutedOrange};
  :hover {
    cursor: pointer;
  }
`;

const StyledSpan = styled.span`
  color: ${colors.mutedOrange};
  ${({ headerType, isMarkdown }) => {
    if (!isMarkdown) {
      switch (headerType) {
        case 'h2':
          return 'font-size: 2.4rem';
        case 'h3':
          return 'font-size: 1.9rem';
        case 'h4':
          return 'font-size: 1.7rem';
        case 'h5':
        case 'h6':
          return 'font-size: 1.6rem';
        default:
          return '';
      }
    } else {
      return '';
    }
  }};
`;

const Header = ({ children, id, isLink, isMarkdown, location, headerType }) => {
  let Component;
  if (isLink) {
    Component = () => (
      <StyledLink id={id} to={`${location.pathname}#${id}`}>
        {!isMarkdown ? <StyledSpan>{children}</StyledSpan> : children}
      </StyledLink>
    );
  } else {
    Component = () => (
      <StyledSpan headerType={headerType} id={id}>
        {children}
      </StyledSpan>
    );
  }
  switch (headerType) {
    case 'h2':
      return (
        <h2>
          <Component />
        </h2>
      );
    case 'h3':
      return (
        <h3>
          <Component />
        </h3>
      );
    case 'h4':
      return (
        <h4>
          <Component />
        </h4>
      );
    case 'h5':
      return (
        <h5>
          <Component />
        </h5>
      );
    case 'h6':
      return (
        <h6>
          <Component />
        </h6>
      );
    default:
      return null;
  }
};

Header.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  isLink: PropTypes.bool.isRequired,
  isMarkdown: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }),
  headerType: PropTypes.string.isRequired
};

export default Header;
