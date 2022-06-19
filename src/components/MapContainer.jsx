import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import getMap from "../api/getMap";

const Map = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 50vh;
`;

const MapContainer = ({ search, setSearch, setText }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAPS_API}&libraries=services,clusterer,drawing&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      getMap(mapRef, search, setSearch, setText);
    };

    return () => script.remove();
  }, [search, setSearch, setText]);

  return <Map id="map" ref={mapRef}></Map>;
};

export default MapContainer;
