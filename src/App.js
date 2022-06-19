import MapContainer from "./components/MapContainer";
import SearchInput from "./components/SearchForm";
import styled from "styled-components";

const Inner = styled.div`
  max-width: 50vw;
  margin: 0 auto;
  padding: 50px 0;
  @media screen and (max-width: 1024px) {
    max-width: 60vw;
  }
  @media screen and (max-width: 768px) {
    max-width: 70vw;
  }
  @media screen and (max-width: 500px) {
    max-width: 90vw;
  }
`;

const App = () => {
  return (
    <div>
      <Inner>
        <SearchInput />
        <MapContainer />
      </Inner>
    </div>
  );
};

export default App;
