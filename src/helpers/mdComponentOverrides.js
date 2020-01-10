import styled from 'styled-components';

import { mutedOrangeRGB } from 'helpers/colors';

import InlineCode from 'components/atoms/InlineCode';
import MdHeader from 'components/atoms/MdHeader';
import MdLink from 'components/atoms/MdLink';
import MdCodeBlock from 'components/molecules/MdCodeBlock';
import MdBlockQuote from 'components/atoms/MdBlockQuote';

const StyledHr = styled.hr`
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

export default location => ({
  a: {
    component: MdLink,
    props: {
      location
    }
  },
  blockquote: {
    component: MdBlockQuote
  },
  h2: {
    component: MdHeader,
    props: {
      location,
      headerType: 'h2'
    }
  },
  h3: {
    component: MdHeader,
    props: {
      location,
      headerType: 'h3'
    }
  },
  h4: {
    component: MdHeader,
    props: {
      location,
      headerType: 'h4'
    }
  },
  h5: {
    component: MdHeader,
    props: {
      location,
      headerType: 'h5'
    }
  },
  h6: {
    component: MdHeader,
    props: {
      location,
      headerType: 'h6'
    }
  },
  hr: {
    component: StyledHr
  },
  pre: {
    component: MdCodeBlock
  },
  code: {
    component: InlineCode
  }
});
