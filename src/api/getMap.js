export const zoomIn = (map) => {
  const level = map.getLevel();
  map.setLevel(level - 1);
};

export const zoomOut = (map) => {
  const level = map.getLevel();
  map.setLevel(level + 1);
};

export const getSearchMap = (map, search, setSearch) => {
  if (search === "") return;
  const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
  const ps = new window.kakao.maps.services.Places();
  ps.keywordSearch(search, placesSearchCB);

  function placesSearchCB(data, status) {
    if (status === window.kakao.maps.services.Status.OK) {
      const bounds = new window.kakao.maps.LatLngBounds();

      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
      }

      map.setBounds(bounds);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      setSearch("");
      alert("검색 결과가 존재하지 않습니다.");
    }
  }

  function displayMarker(place) {
    const marker = new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });

    window.kakao.maps.event.addListener(marker, "click", function () {
      infowindow.setContent(
        '<div style="padding:5px;font-size:12px;line-height:1.4;">' +
          place.place_name +
          "<br />" +
          place.road_address_name +
          "</div>"
      );
      infowindow.open(map, marker);
      map.panTo(new window.kakao.maps.LatLng(place.y, place.x));
      console.log(place.y, place.x);
    });
  }
};
