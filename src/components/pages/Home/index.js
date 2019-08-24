import React from 'react';
import styled from 'styled-components';

import CircleButton from 'components/atoms/CircleButton';

const Centered = styled.div`
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomePage = () => {
  return (
    <Centered>
      <CircleButton to="/blog">Blog</CircleButton>
      <CircleButton to="/about">About</CircleButton>
    </Centered>
  );
};

export default HomePage;
