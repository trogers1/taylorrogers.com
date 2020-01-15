import React from 'react';
import styled from 'styled-components';

import Face from 'images/face.jpg';

import CircleImage from 'components/atoms/CircleImage';
import Header from 'components/atoms/Header';

const Centered = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const StyledImg = styled.img`
  height: 134%;
  margin-top: -4rem;
`;

const HomePage = ({ location }) => {
  return (
    <Centered>
      <CircleImage>
        <StyledImg src={Face} alt="Image of Taylor Rogers' smiling face." />
      </CircleImage>
      <Header isNotLink headerType="h2" location={location} id="about-taylor">
        About Taylor, the&hellip;
      </Header>
    </Centered>
  );
};

export default HomePage;
