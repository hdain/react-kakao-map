import React, { useEffect, useRef } from "react";

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

  return (
    <div
      id="map"
      ref={mapRef}
      style={{ width: "500px", height: "500px" }}
    ></div>
  );
};

export default MapContainer;
