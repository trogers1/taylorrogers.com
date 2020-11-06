import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import colors from 'helpers/colors';

import StyledHr from 'components/atoms/StyledHr';

const Centered = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10%;
`;

const ChartWrapper = styled.div`
  all: unset;
  width: 70%;
`;

const AnimationStyles = styled.div`
  /* This fires as soon as the element enters the DOM*/
  .chart-bar-enter {
    /*We give the list the initial dimension of the list button*/
    width: 0;
  }
  /* This is where we can add the transition*/
  .chart-bar-enter-active {
    width: calc(${({ score, maxPossible }) => score / maxPossible} * 100%);
    transition: width 2s;
  }
  .chart-bar-appear {
    /*We give the list the initial dimension of the list button*/
    width: 0;
  }
  /* This is where we can add the transition*/
  .chart-bar-appear-active {
    width: calc(${({ score, maxPossible }) => score / maxPossible} * 100%);
    transition: width 2s;
  }
`;

const BarLabel = styled.span`
  color: ${colors.mutedYellow};
  position: absolute;
  @media (max-width: 799px) {
    display: inline-block;
    position: static;
  }
`;

const Bar = styled.div`
  background: linear-gradient(270deg, ${colors.mutedBlue} 5%, rgb(${colors.mutedBlueRGB}, 0) 100%);
  height: 2rem;
  margin: 1rem;
  padding-right: 1rem;

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

const HiddenScore = styled.span`
  color: ${colors.mutedDarkBlue};
  display: inline-block;
  width: 100%;
  text-align: right;
`;

const ErrorMessage = styled.div`
  border: solid 0.2rem ${colors.mutedPink};
  color: ${colors.textGrey};
  font-style: italic;
  padding: 1rem 2rem;
`;

const AnimatedBarChart = ({ data, maxPossible, shouldAnimate }) => {
  const [hoverSkill, setHoverSkill] = useState(null);
  return (
    <Centered>
      <StyledHr />
      {!data.length && <ErrorMessage>Nothing to display...</ErrorMessage>}
      {data.length ? (
        <ChartWrapper>
          {data.map(skill => (
            <AnimationStyles key={skill.name} score={skill.score} maxPossible={maxPossible}>
              <BarLabel>{skill.name}</BarLabel>
              <CSSTransition
                in={shouldAnimate}
                timeout={5000}
                classNames="chart-bar"
                unmountOnExit
                appear
              >
                <Bar
                  score={skill.score}
                  maxPossible={maxPossible}
                  onMouseEnter={() => {
                    if (hoverSkill !== skill.name) {
                      setHoverSkill(skill.name);
                    }
                  }}
                  onMouseLeave={() => setHoverSkill(null)}
                >
                  {hoverSkill === skill.name && (
                    <HiddenScore>{`${skill.score}/${maxPossible}`}</HiddenScore>
                  )}
                </Bar>
              </CSSTransition>
            </AnimationStyles>
          ))}
        </ChartWrapper>
      ) : null}
      <StyledHr />
    </Centered>
  );
};

AnimatedBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      types: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
    })
  ),
  maxPossible: PropTypes.number.isRequired,
  shouldAnimate: PropTypes.bool.isRequired
};

export default AnimatedBarChart;
