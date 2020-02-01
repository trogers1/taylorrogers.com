import styled from 'styled-components';

import { mutedOrangeRGB } from 'helpers/colors';

export default styled.hr`
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(${mutedOrangeRGB}, 0.75),
    rgba(0, 0, 0, 0)
  );
  border: 0;
  height: 0.3rem;
  width: 75%;
`;
