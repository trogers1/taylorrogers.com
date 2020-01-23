import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import colors from 'helpers/colors';
import slugify from 'helpers/slugify';

import Header from 'components/atoms/Header';
import StyledHr from 'components/atoms/StyledHr';

const StyledHeader = styled(Header)`
  text-align: center;
  width: 100%;
`;

const Centered = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChartWrapper = styled.div`
  all: unset;
  margin-bottom: 10%;
  width: 70%;
`;

const BarLabel = styled.span`
  position: absolute;
  color: ${colors.mutedYellow};
`;

const Bar = styled.div`
  background: linear-gradient(270deg, ${colors.mutedBlue} 5%, rgb(${colors.mutedBlueRGB}, 0) 100%);
  height: 2rem;
  margin: 1rem;
  width: calc(${({ score, maxPossible }) => score / maxPossible} * 100%);

  :hover {
    background: linear-gradient(
      270deg,
      ${colors.mutedYellow} 5%,
      rgb(${colors.mutedYellowRGB}, 0) 100%
    );
  }

  @media (max-width: 799px) {
    :active {
      background: linear-gradient(
        270deg,
        ${colors.mutedYellow} 5%,
        rgb(${colors.mutedYellowRGB}, 0) 100%
      );
    }
  }
`;

const AnimatedBarChart = ({ title, data, maxPossible, location }) => {
  const [parsedData, setParsedData] = useState([]);
  useEffect(() => {
    console.log('arsed data', parsedData);
    const newData = data.sort((a, b) => b.score - a.score);
    setParsedData(newData);
  }, [data]);
  return (
    <Centered>
      {location ? (
        <StyledHeader isLink headerType="h2" location={location} id={slugify(title)}>
          {title}
        </StyledHeader>
      ) : (
        <StyledHeader headerType="h2">{title}</StyledHeader>
      )}

      <StyledHr />
      <ChartWrapper>
        {parsedData.map(skill => (
          <div key={skill.name}>
            <BarLabel>{skill.name}</BarLabel>
            <Bar score={skill.score} maxPossible={maxPossible} />
          </div>
        ))}
      </ChartWrapper>
    </Centered>
  );
};

AnimatedBarChart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      types: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
    })
  ),
  location: PropTypes.object,
  maxPossible: PropTypes.number.isRequired
};

export default AnimatedBarChart;
