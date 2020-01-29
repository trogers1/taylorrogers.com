import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import colors from 'helpers/colors';

const StyledCard = styled.div`
  background: ${colors.cardBackground};
  color: ${colors.mutedYellow};
`;

const TextWrapper = styled.div`
  cursor: pointer;
  margin: 0.3rem 1rem;
`;

const OptionWrapper = styled.div`
  background: rgb(${colors.cardBackgroundRGB}, 0.7);
  position: absolute;
  width: 100%;
`;

const Option = styled.div`
  border: 1px solid ${colors.cardBackground};
  cursor: pointer;
  margin: 0.3rem 1rem;
  padding: 0.3rem 1rem;
  width: 100%;
  z-index: 2;
  :hover {
    border: 1px solid ${colors.mutedYellow};
    border-radius: 0.2rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  ${({ italic }) => italic && 'font-style: italic'}
`;

const Dropdown = ({ currentSelection, selectFunction, options }) => {
  const [areOptsShown, setOptsVisibility] = useState(false);
  console.log('options', options);
  return (
    <>
      <StyledCard onClick={() => selectFunction(options[2])}>
        {' '}
        Clicky. {currentSelection}
      </StyledCard>
      <StyledCard onClick={() => setOptsVisibility(!areOptsShown)}>
        <TextWrapper>Filter: {currentSelection}</TextWrapper>
        {areOptsShown && (
          <OptionWrapper>
            {options.length &&
              options.map(option => (
                <Option onClick={() => selectFunction(option)} key={option}>
                  {option}
                </Option>
              ))}
            {!options.length && (
              <Option italic key={'No options available'}>
                No options available
              </Option>
            )}
          </OptionWrapper>
        )}
      </StyledCard>
    </>
  );
};

Dropdown.propTypes = {
  currentSelection: PropTypes.string.isRequired,
  selectFunction: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default Dropdown;
