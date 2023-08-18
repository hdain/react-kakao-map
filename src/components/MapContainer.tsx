import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { Map } from '@types';
import getMap, { getCurrentPosition } from '../api/getMap';
import Loader from './Loader';
import MapTypeControl from './MapTypeControl';
import MapZoomControl from './MapZoomControl';
import SearchForm from './Search/SearchForm';
import MapContext from '../context/MapContext';

const KakaoMap = styled.div`
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
  const [map, setMap] = useState<Map>();
  const [loading, setLoading] = useState(false);
  const [overlay, setOverlay] = useState();
  const value = useMemo(() => ({ map, overlay }), [map, overlay]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAPS_API}&libraries=services,clusterer,drawing&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      setLoading(true);
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          const data = async () => {
            const location = await getCurrentPosition();
            getMap(setMap, mapRef, location);
            setOverlay(new window.kakao.maps.CustomOverlay({ zIndex: 1 }));
            setLoading(false);
          };

          data();
        }
      });
    };

    return () => script.remove();
  }, []);

  return (
    <>
      {loading ? <Loader /> : ''}
      <KakaoMap id="map" ref={mapRef} />
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
