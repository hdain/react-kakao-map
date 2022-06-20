import MapContainer from "./components/MapContainer";
import styled from "styled-components";

const Inner = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const App = () => {
  return (
    <div>
      <Inner>
        <MapContainer />
      </Inner>
    </div>
  );
};

export default App;
