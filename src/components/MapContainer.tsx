import React, { useState, useEffect, useRef } from 'react';
import Loader from './Loader';
import MapTypeControl from './MapTypeControl';
import MapZoomControl from './MapZoomControl';
import { getMap } from '../api';
import SearchForm from './Search/SearchForm';
import { useGeolocation } from '../hooks';

function MapContainer() {
  const mapRef = useRef(null);
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
            getMap(mapRef, location);
            setIsLoading(false);
          })();
        }
      });
    };

    return () => script.remove();
  }, [location]);

  return (
    <>
      {isLoading ? <Loader /> : null}
      <div id="map" ref={mapRef} className="h-full w-full" />
      <SearchForm />
      <div className="fixed bottom-10 right-10 z-20 w-14">
        <MapTypeControl />
        <MapZoomControl />
      </div>
    </>
  );
}

export default MapContainer;
