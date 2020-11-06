import React from 'react';
import styled from 'styled-components';

import CircleButton from 'components/atoms/CircleButton';

import { mutedBlue, mutedPink, mutedOrange, codeBorderMutedPurple } from 'helpers/colors';

const Centered = styled.div`
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const HomePage = () => {
  return (
    <Centered>
      <CircleButton color={mutedBlue} to="/dev">
        Developer Tutorials
      </CircleButton>
      <CircleButton color={codeBorderMutedPurple} to="/rpg">
        RPG Blog
      </CircleButton>
      <CircleButton color={mutedPink} to="/essays">
        Essays and Other Writings
      </CircleButton>
      <CircleButton color={mutedOrange} to="/about">
        About
      </CircleButton>
    </Centered>
  );
};

export default HomePage;
