import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from 'helpers/colors';

const BorderDiv = styled.div`
  all: unset;
  background: ${colors.mutedDarkBlue};
  padding: ${props => {
    if (props.position === 'first') {
      return '0 0.05rem 0 0';
    }
    if (props.position === 'middle') {
      return '0 0.05rem 0 0.05rem';
    }
    if (props.position === 'last') {
      return '0 0 0 0.05rem';
    }
  }};
`;

const StyledButton = styled.button`
  all: unset;
  background: ${({ isActive }) => (isActive ? colors.mutedDarkBlue : colors.mutedBlue)};

  color: ${({ isActive }) => (isActive ? colors.mutedOrange : colors.mutedYellow)};
  cursor: pointer;
  font-size: 2rem;
  font-weight: 600;
  padding: 0.3rem 1.5rem;
  white-space: nowrap;

  @media (max-width: 799px) {
    font-size: 1.5rem;
    padding: 0.3rem 1rem;
  }
`;

const TabButton = ({ children, ...rest }) => (
  <BorderDiv {...rest}>
    <StyledButton {...rest}>{children}</StyledButton>
  </BorderDiv>
);

TabButton.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired,
  position: PropTypes.oneOf(['first', 'middle', 'last'])
};

export default TabButton;
