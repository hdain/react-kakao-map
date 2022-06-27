import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { BsX } from "react-icons/bs";
import { getSearchMap } from "../api/getMap";
import { MapContext } from "./MapContainer";

const ListLi = styled.li`
  padding: 5px 0;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlaceName = styled.span`
  cursor: pointer;
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 19px;
  color: #777;
  padding: 0;
  cursor: pointer;
`;

const SearchHistoryLi = ({
  place,
  handleRemovePlace,
  setSearch,
  setShow,
  setPrevSearchPlaces,
}) => {
  const { map, overlay } = useContext(MapContext);

  const handleClickSearch = useCallback(() => {
    getSearchMap(map, overlay, place, setSearch);
    setSearch(place);
    setPrevSearchPlaces((prev) => [...new Set([place, ...prev])]);
    setShow(false);
  }, [map, overlay, place, setSearch, setShow, setPrevSearchPlaces]);

  return (
    <ListLi>
      <PlaceName onClick={handleClickSearch}>{place}</PlaceName>
      <Button onClick={() => handleRemovePlace(place)}>
        <BsX />
      </Button>
    </ListLi>
  );
};

export default SearchHistoryLi;
