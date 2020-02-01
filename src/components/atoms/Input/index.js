import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from 'helpers/colors';

import Close from 'images/close.svg';

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  background: ${colors.cardBackground};
  border: none;
  box-sizing: border-box;
  color: ${props => (!props.disabled ? colors.mutedYellow : 'grey')};
  cursor: ${props => (!props.disabled ? 'text' : 'not-allowed')};
  display: inline-block;
  font-size: 1.6rem;
  ${props => (props.value ? '' : 'font-style: italic;')}
  padding: 0.5rem 1.5rem;
  padding-right: 3rem;
  width: 100%;

  @media screen and (max-width: 499px) {
    font-size: 1.6rem;
  }
`;

const Ex = styled.img`
  position: absolute;
  right: 1.4rem;
  top: 0.8rem;
`;

const Input = ({ className, placeholder, onChange, value }) => {
  return (
    <Wrapper className={className}>
      {value && <Ex src={Close} alt="" aria-hidden onClick={() => onChange('')} />}
      <StyledInput
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        value={value}
      />
    </Wrapper>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string
};

export default Input;
