import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import colors from 'helpers/colors';

const StyledLink = styled.a`
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

const Header = ({ children, id, isLink, isMarkdown, headerType, ...rest }) => {
  const router = useRouter();
  let Component = () => <></>;
  if (isLink) {
    Component = () => (
      <div>
        <Link href={`${router.pathname}#${id}`}>
          <StyledLink id={id}>
            {!isMarkdown ? <StyledSpan headerType={headerType}>{children}</StyledSpan> : children}
          </StyledLink>
        </Link>
      </div>
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
        <h2 {...rest}>
          <Component />
        </h2>
      );
    case 'h3':
      return (
        <h3 {...rest}>
          <Component />
        </h3>
      );
    case 'h4':
      return (
        <h4 {...rest}>
          <Component />
        </h4>
      );
    case 'h5':
      return (
        <h5 {...rest}>
          <Component />
        </h5>
      );
    case 'h6':
      return (
        <h6 {...rest}>
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
