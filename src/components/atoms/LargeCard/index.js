import styled from 'styled-components';

import { cardBackground } from 'helpers/colors';

export default styled.div`
  background: ${cardBackground};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: white;
  display: flex;
  flex-direction: column;
  height: auto;
  margin: 2rem;
  margin-bottom: 5rem;
  max-width: 125rem;
  padding: 2rem;
  text-decoration: none;
  width: auto;
`;
