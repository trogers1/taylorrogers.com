import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import config from 'config/config';

import GlobalFooter from 'components/atoms/GlobalFooter';
import GlobalHeader from 'components/atoms/GlobalHeader';
import ScrollToTopOrHash from 'components/atoms/ScrollToTopOrHash';
import HeadingLarge from 'components/atoms/HeadingLarge';
import PageViews from 'components/organisms/PageViews';
import HomePage from 'components/pages/Home';
import About from 'components/pages/About';
import Blog from 'components/pages/Blog';

const BodyWrapper = styled.div`
  box-sizing: border-box;
  color: #b9b9b9;
  font-size: 1.6rem;
  padding-top: 6rem;
  width: 100%;
  word-break: break-word;
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
      <ScrollToTopOrHash />
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
              <Route exact path="/about" component={About} />
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
