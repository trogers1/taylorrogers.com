import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import GlobalFooter from 'components/atoms/GlobalFooter';
import GlobalHeader from 'components/atoms/GlobalHeader';
import ScrollToTop from 'components/atoms/ScrollToTop';
import PageViews from 'components/organisms/PageViews';
import HomePage from 'components/pages/Home';
import About from 'components/pages/About';
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
  return (
    <Router>
      <PageViews />
      <ScrollToTop />
      <Flex>
        <GlobalHeader />
        <BodyWrapper>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/dev" component={Blog} />
            <Route path="/rpg" component={Blog} />
            <Route path="/essays" component={Blog} />
            <Route exact path="/about" render={About} />
            <Redirect to="/" />
          </Switch>
        </BodyWrapper>
      </Flex>
      <GlobalFooter />
    </Router>
  );
};

export default App;
