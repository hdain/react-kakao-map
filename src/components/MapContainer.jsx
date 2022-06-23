import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useMemo,
} from "react";
import styled from "styled-components";
import getMap from "../api/getMap";
import getGeolocation from "../utils/getGeolocation";
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
  const [location, setLocation] = useState({
    latitude: 37.39525750009229,
    longitude: 127.11148651523494,
  });
  const value = useMemo(() => ({ map, overlay }), [map, overlay]);

  useEffect(() => {
    if (navigator.geolocation) {
      const data = async () => {
        const position = await getGeolocation();
        console.log(position);
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      };

      data();
    }
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAPS_API}&libraries=services,clusterer,drawing&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          getMap(setMap, mapRef, location);
          setOverlay(new window.kakao.maps.CustomOverlay({ zIndex: 1 }));
        }
      });
    };
    console.log("render");

    return () => script.remove();
  }, [location]);

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
