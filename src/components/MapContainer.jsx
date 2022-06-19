import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Map = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 50vh;
`;

const MapContainer = () => {
  const mapRef = useRef(null);

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

          new window.kakao.maps.Map(mapRef.current, options);
        }
      });
    };

    return () => script.remove();
  }, []);

  return <Map id="map" ref={mapRef}></Map>;
};

export default MapContainer;
