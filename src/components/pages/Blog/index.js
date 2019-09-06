import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import BlogHome from 'components/organisms/BlogHome';
import BlogPost from 'components/organisms/BlogPost';

const Blog = ({ location }) => {
  const [validBlogPosts, setValidBlogPosts] = useState([]);
  useEffect(() => {
    setValidBlogPosts([
      {
        title: 'blah'
      }
    ]);
  }, []);
  return (
    <Switch>
      <Route path="/blog" exact component={BlogHome} />
      <Route key={`blogPost-kong`} path={`/blog/kong`} exact component={BlogPost} />
      {validBlogPosts.map((blogPost, index) => (
        <Route key={`blogPost-${index}`} path={`/blog/${blogPost.id}`} exact component={BlogPost} />
      ))}
      <Redirect to="/" />
    </Switch>
  );
};

export default Blog;
