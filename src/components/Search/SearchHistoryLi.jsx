import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { BsX, BsGeoAltFill } from "react-icons/bs";
import { getSearchMap } from "../../api/getMap";
import { MapContext } from "../MapContainer";

const ListLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.a`
  display: flex;
  align-items: flex-start;
  font-size: 15px;
  padding: 7px 0;
  text-decoration: none;
  color: #999;
  flex-grow: 1;
`;

const PlaceName = styled.span`
  cursor: pointer;
  padding-left: 9px;
  color: #000;
`;

const Button = styled.button`
  display: flex;
  background: none;
  border: none;
  font-size: 19px;
  color: #777;
  padding: 0;
  vertical-align: middle;
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
      <Text href="#" onClick={handleClickSearch}>
        <BsGeoAltFill />
        <PlaceName>{place}</PlaceName>
      </Text>
      <Button onClick={() => handleRemovePlace(place)}>
        <BsX />
      </Button>
    </ListLi>
  );
};

export default SearchHistoryLi;
