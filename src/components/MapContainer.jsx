import React, { useState, useEffect, useRef, createContext } from "react";
import styled from "styled-components";
import getMap from "../api/getMap";
import MapTypeButtons from "./MapTypeButtons";
import MapZoomControl from "./MapZoomControl";
import SearchForm from "./SearchForm";

export const MapContext = createContext();

const Map = styled.div`
  width: 100%;
  height: 100%;
`;

const MapContainer = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAPS_API}&libraries=services,clusterer,drawing&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };

          const kakaoMap = new window.kakao.maps.Map(mapRef.current, options);
          setMap(kakaoMap);
        }
      });
    };

    return () => script.remove();
  }, []);

  return (
    <>
      <Map id="map" ref={mapRef}></Map>
      <MapContext.Provider value={map}>
        <SearchForm />
        <MapTypeButtons />
        <MapZoomControl />
      </MapContext.Provider>
    </>
  );
};

export default MapContainer;
