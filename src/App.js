import MapContainer from "./components/MapContainer";
import SearchInput from "./components/SearchForm";
import styled from "styled-components";
import { useState } from "react";

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
  const [search, setSearch] = useState("");
  const [text, setText] = useState("");

  return (
    <div>
      <Inner>
        <SearchInput setSearch={setSearch} text={text} setText={setText} />
        <MapContainer search={search} setSearch={setSearch} setText={setText} />
      </Inner>
    </div>
  );
};

export default App;
