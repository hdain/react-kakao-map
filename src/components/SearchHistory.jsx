import React from "react";
import styled from "styled-components";
import SearchHistoryLi from "./SearchHistoryLi";

const Container = styled.div`
  position: absolute;
  top: 42px;
  left: 0;
  right: 0;
  border: 1px solid #777;
  border-top: 1px solid #ccc;
  padding: 15px 15px 5px;
  border-radius: 0 0 5px 5px;
  background: #fff;
`;

const HistoryTitle = styled.div`
  color: #777;
  font-size: 15px;
`;

const HistoryList = styled.ul`
  margin: 0;
  padding: 5px 0;
`;

const SearchHistory = ({
  prevSearchPlaces,
  handleRemovePlace,
  setSearch,
  setShow,
  setPrevSearchPlaces,
}) => {
  return (
    <Container>
      <HistoryTitle>최근 검색어</HistoryTitle>
      <HistoryList>
        {prevSearchPlaces.map((place) => (
          <SearchHistoryLi
            key={place}
            place={place}
            setSearch={setSearch}
            setShow={setShow}
            setPrevSearchPlaces={setPrevSearchPlaces}
            handleRemovePlace={handleRemovePlace}
          />
        ))}
      </HistoryList>
    </Container>
  );
};

export default SearchHistory;
