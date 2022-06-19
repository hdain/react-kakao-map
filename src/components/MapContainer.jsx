import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Map = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 50vh;
`;

const MapContainer = ({ search }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAPS_API}&libraries=services,clusterer,drawing&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };

          const map = new window.kakao.maps.Map(mapRef.current, options);

          if (search !== "") {
            const ps = new window.kakao.maps.services.Places();
            ps.keywordSearch(search, placesSearchCB);

            function placesSearchCB(data, status, pagination) {
              if (status === window.kakao.maps.services.Status.OK) {
                const bounds = new window.kakao.maps.LatLngBounds();

                for (let i = 0; i < data.length; i++) {
                  displayMarker(data[i]);
                  bounds.extend(
                    new window.kakao.maps.LatLng(data[i].y, data[i].x)
                  );
                }

                map.setBounds(bounds);
              }
            }

            function displayMarker(place) {
              const marker = new window.kakao.maps.Marker({
                map: map,
                position: new window.kakao.maps.LatLng(place.y, place.x),
              });

              window.kakao.maps.event.addListener(marker, "click", function () {
                infowindow.setContent(
                  '<div style="padding:5px;font-size:12px;">' +
                    place.place_name +
                    "</div>"
                );
                infowindow.open(map, marker);
              });
            }
          }
        }
      });
    };

    return () => script.remove();
  }, [search]);

  return <Map id="map" ref={mapRef}></Map>;
};

export default MapContainer;
