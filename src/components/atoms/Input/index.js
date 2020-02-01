import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from 'helpers/colors';

import Close from 'images/close.svg';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const StyledInput = styled.input`
  display: inline-block;

  padding: 0.5rem 1.5rem;
  padding-right: 3rem;
  cursor: ${props => (!props.disabled ? 'text' : 'not-allowed')};
  background: ${colors.cardBackground};
  color: ${props => (!props.disabled ? colors.mutedYellow : 'grey')};
  width: 100%;
  border: none;
  box-sizing: border-box;
  font-size: 1.6rem;

  @media screen and (max-width: 499px) {
    font-size: 1.6rem;
  }
`;

const Ex = styled.img`
  position: absolute;
  right: 1.4rem;
  top: 0.8rem;
`;

const Input = ({ value, placeholder, setValue, className }) => {
  return (
    <Wrapper className={className}>
      {value && <Ex src={Close} alt="" aria-hidden onClick={() => setValue('')} />}
      <StyledInput
        placeholder={placeholder}
        onChange={e => setValue(e.target.value)}
        value={value}
      />
    </Wrapper>
  );
};

Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired
};

export default Input;
