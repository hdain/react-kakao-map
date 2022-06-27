import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import styled from "styled-components";
import { getSearchMap } from "../api/getMap";
import { MapContext } from "./MapContainer";
import SearchHistory from "./SearchHistory";

const Form = styled.form`
  position: fixed;
  z-index: 2;
  top: 20px;
  left: 50%;
  max-width: 700px;
  width: 90%;
  transform: translateX(-50%);
`;

const Input = styled.input`
  width: 100%;
  font-size: 20px;
  padding: 10px 15px;
  box-sizing: border-box;
  border: 1px solid #777;
  border-radius: 5px;
`;

const Button = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 25px;
  cursor: pointer;
`;

const SearchForm = () => {
  const { map, overlay } = useContext(MapContext);
  const historyRef = useRef(null);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [prevSearchPlaces, setPrevSearchPlaces] = useState(
    JSON.parse(localStorage.getItem("searchPlaces") || "[]")
  );

  const handleChange = useCallback(
    (e) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  const handleSubmit = useCallback(
    (e) => {
      overlay.setMap(null);
      getSearchMap(map, overlay, search, setSearch);
      setPrevSearchPlaces((prev) => [search, ...prev]);
      setShow(false);
      e.preventDefault();
    },
    [map, overlay, search, setSearch]
  );

  const handleRemovePlace = useCallback(
    (place) => {
      const places = prevSearchPlaces.filter(
        (removePlace) => removePlace !== place
      );
      setPrevSearchPlaces(places);
    },
    [prevSearchPlaces]
  );

  const handleClickOutside = useCallback(
    (e) => {
      if (
        show &&
        (!historyRef.current || !historyRef.current.contains(e.target))
      )
        setShow(false);
    },
    [show]
  );

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    localStorage.setItem("searchPlaces", JSON.stringify(prevSearchPlaces));
  }, [prevSearchPlaces]);

  return (
    <Form onSubmit={handleSubmit} ref={historyRef}>
      <>
        <Input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="검색어를 입력해주세요"
          onClick={() => setShow(true)}
        />
        <Button type="submit">🔍</Button>
      </>
      {show && (
        <SearchHistory
          prevSearchPlaces={prevSearchPlaces}
          handleRemovePlace={handleRemovePlace}
        />
      )}
    </Form>
  );
};

export default SearchForm;
