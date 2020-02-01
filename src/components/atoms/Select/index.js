import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { mutedYellow, cardBackground, mutedBlue } from 'helpers/colors';
import DownCaret from 'images/caret-yellow-down.svg';
import LoadingGif from 'images/LoadingGif.gif';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;

  /* Prevent Edge from adding extra carets */
  select::-ms-expand {
    display: none;
  }
`;

const StyledSelect = styled.select`
  appearance: none;
  padding: 0.5rem 1rem;
  padding-right: 3rem;
  cursor: ${props => (!props.disabled ? 'pointer' : 'not-allowed')};
  background: ${cardBackground};
  color: ${props => (!props.disabled ? mutedYellow : 'grey')};
  width: 100%;
  border: none;
  font-size: 1.6rem;

  @media screen and (max-width: 499px) {
    font-size: 1.6rem;
  }

  /* Edge does not highlight keyboard selected options in the select without this */
  @supports (-ms-ime-align: auto) {
    appearance: menulist;
  }
`;

const StyledOption = styled.option`
  color: ${props => (!props.disabled ? mutedBlue : 'grey')};
`;

const Caret = styled.img`
  position: absolute;
  right: 1.4rem;
  top: 1.2rem;
`;

const Loading = styled.img`
  position: absolute;
  right: 1.4rem;
  top: 0.8rem;
  width: 2rem;
`;

const Select = ({
  ariaLabel = '',
  className,
  disabled,
  id,
  isLoading = false,
  name,
  onChange,
  options,
  placeholder = '',
  required,
  selection
}) => {
  const selectedValue = typeof selection === 'object' ? selection.value : selection;
  const value = selectedValue || placeholder;

  return (
    <Wrapper className={className}>
      {!disabled && !isLoading && <Caret src={DownCaret} alt="" aria-hidden />}
      {isLoading && <Loading src={LoadingGif} alt="loading options" />}
      <StyledSelect
        required={required}
        id={id}
        onChange={onChange}
        value={value}
        aria-label={ariaLabel}
        disabled={disabled}
        name={name}
      >
        {placeholder && (
          <StyledOption className="default" disabled>
            {placeholder}
          </StyledOption>
        )}
        {options.map((option, index) => {
          return (
            <StyledOption key={`option-${index}`} value={option}>
              {option}
            </StyledOption>
          );
        })}
      </StyledSelect>
    </Wrapper>
  );
};

Select.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  selection: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Select;
