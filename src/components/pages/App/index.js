import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import config from 'config/config';

import GlobalFooter from 'components/atoms/GlobalFooter';
import GlobalHeader from 'components/atoms/GlobalHeader';
import ScrollToTop from 'components/atoms/ScrollToTop';
import HeadingLarge from 'components/atoms/HeadingLarge';
import PageViews from 'components/organisms/PageViews';
import HomePage from 'components/pages/Home';
import Blog from 'components/pages/Blog';

const BodyWrapper = styled.div`
  box-sizing: border-box;
  padding-top: 6rem;
  width: 100%;
`;
const Flex = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      let res = await fetch(`${config.blogApiUrl}/blog`, { method: 'GET' });
      res = await res.json();
      setPosts(res.data);
      setIsLoading(false);
    }
    getPosts();
  }, []);
  return (
    <Router>
      <PageViews />
      <ScrollToTop />
      <Flex>
        <GlobalHeader />
        <BodyWrapper>
          {isLoading && <HeadingLarge>Loading...</HeadingLarge>}
          {!isLoading && (
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/dev" component={Blog} />
              <Route path="/rpg" component={Blog} />
              <Route path="/essays" component={Blog} />
              <Route exact path="/about" render={() => <div>Coming soon...</div>} />
              {posts.map(post => (
                <Route
                  key={post.id}
                  exact
                  path={`/${post.attributes.type}/${post.id}`}
                  component={Blog}
                />
              ))}
              <Redirect to="/" />
            </Switch>
          )}
        </BodyWrapper>
      </Flex>
      <GlobalFooter />
    </Router>
  );
};

export default App;
