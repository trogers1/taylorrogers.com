import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Markdown from 'markdown-to-jsx';

import config from 'config/config';
import getOverrides from 'helpers/mdComponentOverrides';

import HeadingLarge from 'components/atoms/HeadingLarge';
import LargeCard from 'components/atoms/LargeCard';

const Centered = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
  max-width: 100%;
`;

const UniversalMdStyles = styled(Markdown)`
  > * {
    margin-top: 4rem;
    margin-bottom: 4rem;
  }
`;

const BlogPage = ({ location }) => {
  const { hash } = location;
  const overrides = getOverrides(location);
  const [article, setArticle] = useState('');
  let blogId = location.pathname;
  blogId = blogId.split('/')[2];
  useEffect(() => {
    async function getArticle() {
      let res = await fetch(`${config.blogApiUrl}/blog/${blogId}?fullText=true`, { method: 'GET' });
      res = await res.json();
      setArticle(res.data.attributes);
    }
    getArticle();
  }, [blogId]);

  // Scroll to hash, if present
  useEffect(() => {
    const id = hash.replace(/#/g, '');
    if (hash && document.getElementById(id)) {
      const scrollOffset = -60;
      const element = document.getElementById(id);
      const scrollTo = element.getBoundingClientRect().top + window.pageYOffset + scrollOffset;
      window.scrollTo({ top: scrollTo, behavior: 'smooth' });
    }
  }, [hash, article]); // Fires every time hash changes or article is loaded

  return (
    <Centered>
      <HeadingLarge>{article ? article.title : 'Loading...'}</HeadingLarge>
      {article && (
        <LargeCard>
          <UniversalMdStyles options={{ overrides }}>{article.body}</UniversalMdStyles>
        </LargeCard>
      )}
    </Centered>
  );
};

export default BlogPage;
