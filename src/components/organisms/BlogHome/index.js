import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import config from 'config/config';

import HeadingLarge from 'components/atoms/HeadingLarge';
import Grid from 'components/atoms/Grid';
import Card from 'components/molecules/SmallCardLink';

const StyledGrid = styled(Grid)`
  margin-bottom: 5rem;
  max-width: 125rem;
`;

const Centered = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
`;

const BlogHome = ({ location }) => {
  let currBlogType = location.pathname.split('/')[1];
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      let res = await fetch(`${config.blogApiUrl}/blog`, { method: 'GET' });
      res = await res.json();
      setPosts(res.data);
    }
    getPosts();
  }, []);

  return (
    <Centered>
      <HeadingLarge>{posts.length ? 'Welcome' : 'Loading'}</HeadingLarge>
      <StyledGrid>
        {posts.map(post => (
          <Card
            key={post.id}
            title={post.attributes.title}
            previewText={post.attributes.previewText}
            to={`/${currBlogType}/${post.id}`}
          />
        ))}
      </StyledGrid>
    </Centered>
  );
};

export default BlogHome;
