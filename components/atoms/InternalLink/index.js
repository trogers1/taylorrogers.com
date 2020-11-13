import styled from 'styled-components';
import Link from 'next/link';

import { mutedBlue } from 'helpers/colors';

const StyledA = styled.a`
  color: ${mutedBlue};
`;

const StyledInternalLink = ({ children, href, ...props }) => {
  return (
    <Link href={href}>
      <StyledA {...props}>{children}</StyledA>
    </Link>
  );
};

export default StyledInternalLink;
