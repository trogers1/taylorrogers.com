import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import GlobalFooter from 'components/atoms/GlobalFooter';
import GlobalHeader from 'components/atoms/GlobalHeader';
import ScrollToTop from 'components/atoms/ScrollToTop';
import HomePage from 'components/pages/Home';
import Blog from 'components/pages/Blog';

const BodyWrapper = styled.div`
  padding-top: 6rem;
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
      <ScrollToTop />
      <Flex>
        <GlobalHeader />
        <BodyWrapper>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/blog" component={Blog} />
            <Route exact path="/about" render={() => <div>Coming soon...</div>} />
            <Redirect to="/" />
          </Switch>
        </BodyWrapper>
      </Flex>
      <GlobalFooter />
    </Router>
  );
};

export default App;
