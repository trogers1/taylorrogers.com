import styled from 'styled-components';

import { mutedOrangeRGB } from 'helpers/colors';

import InlineCode from 'components/atoms/InlineCode';
import Header from 'components/atoms/Header';
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
    component: Header,
    props: {
      location,
      headerType: 'h2',
      isLink: true,
      isMarkdown: true
    }
  },
  h3: {
    component: Header,
    props: {
      location,
      headerType: 'h3',
      isLink: true,
      isMarkdown: true
    }
  },
  h4: {
    component: Header,
    props: {
      location,
      headerType: 'h4',
      isLink: true,
      isMarkdown: true
    }
  },
  h5: {
    component: Header,
    props: {
      location,
      headerType: 'h5',
      isLink: true,
      isMarkdown: true
    }
  },
  h6: {
    component: Header,
    props: {
      location,
      headerType: 'h6',
      isLink: true,
      isMarkdown: true
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
