import styled from 'styled-components';

import {
  codeBackgroundDarkBlue,
  codeBorderMutedPurple,
  mutedDarkBlue,
  mutedYellow,
  mutedOrange
} from 'helpers/colors';

import MdHeader from 'components/atoms/MdHeader';
import MdLink from 'components/atoms/MdLink';
import MdCodeBlock from 'components/atoms/MdCodeBlock';

const StyledHr = styled.hr`
  color: ${mutedOrange};
  width: 75%;
`;

const StyledInlineCode = styled.code`
  color: ${mutedYellow};
  background: ${codeBackgroundDarkBlue};
  border: 0.2px ${codeBorderMutedPurple} solid;
  border-radius: 0.2rem;
  padding: 0 0.5rem 0 0.5rem;
`;

const StyledBlockQuote = styled.blockquote`
  background: ${mutedDarkBlue};
  padding: 1rem 2rem;
  margin: 1rem 2rem;
`;

export default location => ({
  a: {
    component: MdLink,
    props: {
      location
    }
  },
  blockquote: {
    component: StyledBlockQuote
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
    component: StyledInlineCode
  }
});
