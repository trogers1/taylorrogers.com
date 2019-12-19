import styled from 'styled-components';

import { cardBackground, textGrey } from 'helpers/colors';

export default styled.div`
  background: ${cardBackground};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: ${textGrey};
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  height: auto;
  margin: 2rem;
  margin-bottom: 5rem;
  max-width: 90%;
  padding: 2rem;
  text-decoration: none;
  width: auto;
`;
