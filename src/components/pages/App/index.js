import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import GlobalFooter from 'components/atoms/GlobalFooter';
import GlobalHeader from 'components/atoms/GlobalHeader';
import ScrollToTop from 'components/atoms/ScrollToTop';

const Flex = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;
const App = () => {
  return (
    <Flex>
      <Router>
        <ScrollToTop />
        <GlobalHeader />
        <Switch>
          <Route path="/" render={() => <div>Coming soon...</div>} />{' '}
          {/*component={<div>Coming soon...</div>}*/}
          <Route path="/blog" render={() => <div>Coming soon...</div>} />
          <Route path="/about" render={() => <div>Coming soon...</div>} />
          <Route render={() => <div>NOT FOUND Coming soon...</div>} />
        </Switch>
        <GlobalFooter />
      </Router>
    </Flex>
  );
};

export default App;
