import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import HeadingLarge from 'components/atoms/HeadingLarge';
import LargeCard from 'components/atoms/LargeCard';

const Centered = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
`;

const BlogPage = ({ location }) => {
  const [article, setArticle] = useState(null);
  useEffect(() => {
    async function getArticle() {
      fetch('/Users/admin/Documents/Code/taylor-rogers/public/posts/Start-Notes.md')
        .then(res => res.text())
        .then(text => setArticle(text));
    }
    getArticle();
  }, []);

  return (
    <Centered>
      <HeadingLarge>Welcome</HeadingLarge>
      <LargeCard>{article}</LargeCard>
    </Centered>
  );
};

export default BlogPage;
