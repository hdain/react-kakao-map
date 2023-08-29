import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Loader from './Loader';
import MapTypeControl from './MapTypeControl';
import MapZoomControl from './MapZoomControl';
import { getMap } from '../api';
import SearchForm from './Search/SearchForm';
import { useGeolocation, useSetMap } from '../hooks';

const KakaoMapContainer = styled.div`
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

function MapContainer() {
  const mapRef = useRef(null);
  const setMap = useSetMap();
  const location = useGeolocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAPS_API
    }&libraries=services,clusterer,drawing&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      setIsLoading(true);
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          (async () => {
            getMap(setMap, mapRef, location);
            setIsLoading(false);
          })();
        }
      });
    };

    return () => script.remove();
  }, [setMap, location]);

  return (
    <>
      {isLoading ? <Loader /> : null}
      <KakaoMapContainer id="map" ref={mapRef} />
      <SearchForm />
      <MapControlView>
        <MapTypeControl />
        <MapZoomControl />
      </MapControlView>
    </>
  );
}

export default MapContainer;
