import styled from 'styled-components';

import { mutedOrangeRGB } from 'helpers/colors';

export default styled.hr`
  border: 0;
  height: 0.3rem;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(${mutedOrangeRGB}, 0.75),
    rgba(0, 0, 0, 0)
  );

  width: 75%;
`;
