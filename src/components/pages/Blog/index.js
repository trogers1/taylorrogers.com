import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import config from 'config/config';

import BlogHome from 'components/organisms/BlogHome';
import BlogPost from 'components/organisms/BlogPost';
import NotFound from 'components/pages/NotFound';

const Blog = ({ location }) => {
  const [validBlogPosts, setValidBlogPosts] = useState([]);
  let currBlogId = location.pathname.split('/')[2];
  let currBlogType = location.pathname.split('/')[1];
  useEffect(() => {
    async function getArticles() {
      let res = await fetch(`${config.blogApiUrl}/blog/?type=${currBlogType}`, { method: 'GET' });
      res = await res.json();
      setValidBlogPosts(res.data);
    }
    getArticles();
  }, [currBlogType]);
  if (validBlogPosts.length && currBlogId && !validBlogPosts.some(post => post.id === currBlogId)) {
    return <Route to={`/${currBlogType}/${currBlogId}`} exact component={NotFound} />;
  }
  return (
    <Switch>
      <Route path={`/${currBlogType}`} exact component={BlogHome} />
      {validBlogPosts.map(blogPost => (
        <Route
          key={`blogPost-${currBlogType}-${blogPost.attributes.title}`}
          path={`/${currBlogType}/${blogPost.id}`}
          exact
          component={BlogPost}
        />
      ))}
    </Switch>
  );
};

export default Blog;
