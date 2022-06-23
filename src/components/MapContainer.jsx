import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useMemo,
} from "react";
import styled from "styled-components";
import getMap from "../api/getMap";
import MapTypeControl from "./MapTypeControl";
import MapZoomControl from "./MapZoomControl";
import SearchForm from "./SearchForm";

export const MapContext = createContext({ map: {}, overlay: {} });

const Map = styled.div`
  width: 100%;
  height: 100%;
`;

const MapControlView = styled.div`
  position: fixed;
  right: 10px;
  bottom: 10px;
  width: 50px;
  z-index: 2;
`;

const MapContainer = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState();
  const [overlay, setOverlay] = useState();
  const value = useMemo(() => ({ map, overlay }), [map, overlay]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAPS_API}&libraries=services,clusterer,drawing&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          getMap(setMap, mapRef);
          setOverlay(new window.kakao.maps.CustomOverlay({ zIndex: 1 }));
        }
      });
    };

    return () => script.remove();
  }, []);

  return (
    <>
      <Map id="map" ref={mapRef}></Map>
      <MapContext.Provider value={value}>
        <SearchForm />
        <MapControlView>
          <MapTypeControl />
          <MapZoomControl />
        </MapControlView>
      </MapContext.Provider>
    </>
  );
};

export default MapContainer;
