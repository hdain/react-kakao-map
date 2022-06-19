import MapContainer from "./components/MapContainer";
import SearchInput from "./components/SearchForm";
import styled from "styled-components";
import { useState } from "react";

const Inner = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
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
