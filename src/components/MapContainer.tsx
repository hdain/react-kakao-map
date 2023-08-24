import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import Loader from './Loader';
import MapTypeControl from './MapTypeControl';
import MapZoomControl from './MapZoomControl';
import { getMap } from '../api';
import { KakaoMap, MapContext } from '../context';
import SearchForm from './Search/SearchForm';
import { useGeolocation } from '../hooks';
import { useMapStore } from '../store';

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
  const location = useGeolocation();
  const [kakaoMap, setKakaoMap] = useState<KakaoMap>({} as KakaoMap);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const value = useMemo(
    () => ({ map: kakaoMap.map, overlay: kakaoMap.overlay, markers: kakaoMap.markers }),
    [kakaoMap],
  );

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAPS_API}&libraries=services,clusterer,drawing&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      setIsLoading(true);
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          (async () => {
            getMap(setKakaoMap, mapRef, location);
            setIsLoading(false);
          })();
        }
      });
    };

    return () => script.remove();
  }, [setKakaoMap, location]);

  return (
    <>
      {isLoading ? <Loader /> : null}
      <KakaoMapContainer id="map" ref={mapRef} />
      <MapContext.Provider value={value}>
        <SearchForm />
        <MapControlView>
          <MapTypeControl />
          <MapZoomControl />
        </MapControlView>
      </MapContext.Provider>
    </>
  );
}

export default MapContainer;
