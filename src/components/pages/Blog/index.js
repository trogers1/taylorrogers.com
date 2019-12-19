import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
      let res = await fetch(`${config.blogApiUrl}/blog/`, { method: 'GET' });
      res = await res.json();
      setValidBlogPosts(res.data);
    }
    getArticles();
  });
  if (validBlogPosts.length && currBlogId && !validBlogPosts.some(post => post.id === currBlogId)) {
    return <Route to={`/${currBlogType}/${currBlogId}`} exact component={NotFound} />;
  }
  return (
    <Switch>
      <Route path="/blog" exact component={BlogHome} />
      <Route key={`blogPost-kong`} path={`/blog/kong`} exact component={BlogPost} />
      {validBlogPosts.map(blogPost => (
        <Route
          key={`blogPost-${blogPost.attributes.title}`}
          path={`/blog/${blogPost.id}`}
          exact
          component={BlogPost}
        />
      ))}
    </Switch>
  );
};

export default Blog;
