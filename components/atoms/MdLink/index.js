import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import ExternalLink from 'components/atoms/ExternalLink';
import InternalLink from 'components/atoms/InternalLink';

const MdLink = ({ children, router, href }) => {
  if (href.startsWith('#')) {
    return <InternalLink href={`${router.pathname}${href}`}>{children}</InternalLink>;
  } else {
    return <ExternalLink href={href}>{children}</ExternalLink>;
  }
};

export default MdLink;
