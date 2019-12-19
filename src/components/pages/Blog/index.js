import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import config from 'config/config';

import BlogHome from 'components/organisms/BlogHome';
import BlogPost from 'components/organisms/BlogPost';

const Blog = ({ location }) => {
  const [validBlogPosts, setValidBlogPosts] = useState([]);
  useEffect(() => {
    async function getArticles() {
      let res = await fetch(`${config.blogApiUrl}/blog/`, { method: 'GET' });
      res = await res.json();
      setValidBlogPosts(res.data);
    }
    getArticles();
  }, []);
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
      <Redirect to="/" />
    </Switch>
  );
};

export default Blog;
