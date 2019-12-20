import styled from 'styled-components';

import { cardBackground, textGrey } from 'helpers/colors';

export default styled.div`
  background: ${cardBackground};
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: ${textGrey};
  font-size: 1.6rem;
  height: auto;
  margin: 2rem;
  margin-bottom: 5rem;
  max-width: 90%;
  padding: 2rem 4rem;
  text-decoration: none;
  width: auto;
  word-break: break-word;

  @media (max-width: 799px) {
    padding: 2rem 1rem;
    max-width: 100%;
    margin: 2rem 0.5rem;
  }
`;
