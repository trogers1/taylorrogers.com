import React from 'react';
import styled from 'styled-components';

const Centered = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
function App() {
  return <Centered>Welcome!</Centered>;
}

export default App;
