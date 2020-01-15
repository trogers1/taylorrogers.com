import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CircleDiv = styled.div`
  align-self: center;
  border-radius: 50%;
  height: 20rem;
  margin: 6rem 0 4.7rem 0;
  overflow: hidden;
  transition: transform 0.4s;
  width: 20rem;
  :hover {
    transform: scale(1.1);
  }

  @media (min-width: 499px) {
    height: 30rem;
    width: 30rem;
  }
`;

const CircleImg = ({ children }) => {
  return <CircleDiv>{children}</CircleDiv>;
};

CircleImg.propTypes = {
  children: PropTypes.node
};

export default CircleImg;
