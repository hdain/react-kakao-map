import React from 'react';
import styled from 'styled-components';
import { MapContainer } from './components';

const Inner = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

function App() {
  return (
    <Inner>
      <MapContainer />
    </Inner>
  );
}

export default App;
