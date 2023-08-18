import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import {
  LatLng,
  Map,
  Marker,
  Overlay,
  OverlayMapTypeId,
  Place,
  SearchKeyword,
  SearchResult,
  SearchStatus,
} from '@types';
import getGeolocation from '../utils/getGeolocation';
import getOverlayContent from '../utils/getOverlayContent';

export const zoomIn = (map: Map) => {
  const level = map.getLevel();
  map.setLevel(level - 1);
};

export const zoomOut = (map: Map) => {
  const level = map.getLevel();
  map.setLevel(level + 1);
};

export const addOverlayMapTypeId = (map: Map, type: OverlayMapTypeId) => {
  map.addOverlayMapTypeId(window.kakao.maps.MapTypeId[type]);
};

export const removeOverlayMapTypeId = (map: Map, type: OverlayMapTypeId) => {
  map.removeOverlayMapTypeId(window.kakao.maps.MapTypeId[type]);
};

export const getCurrentPosition = async () => {
  const { latitude, longitude } = await getGeolocation();
  return { latitude, longitude };
};

const getDistance = async (marker: Marker): Promise<string> => {
  const currentPosition = await getCurrentPosition();
  const markerPosition = marker.getPosition();
  const polyline = new window.kakao.maps.Polyline({
    path: [
      new window.kakao.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
      new window.kakao.maps.LatLng(markerPosition.latitude, markerPosition.longitude),
    ],
  });

  let distance = `${Math.round(polyline.getLength())}`;
  if (+distance >= 1000) distance = `${(+distance / 1000).toFixed(1)}km`;
  else distance += 'm';

  return distance;
};

const markers: Array<Marker> = [];

const removeAllMarkers = () => {
  markers.forEach((marker) => marker.setMap(null));
  markers.splice(0);
};

const displayPlaceInfo = async (map: Map, overlay: Overlay, marker: Marker, place: Place) => {
  const closeOverlay = () => overlay.setMap(null);
  const distance = await getDistance(marker);
  const content = getOverlayContent(place, closeOverlay, distance);
  const position = new window.kakao.maps.LatLng(+place.y, +place.x);

  overlay.setContent(content);
  overlay.setMap(map);
  overlay.setPosition(position);
};

const getMarker = async (map: Map, overlay: Overlay, place: Place) => {
  const marker = new window.kakao.maps.Marker({
    map,
    position: new window.kakao.maps.LatLng(+place.y, +place.x),
  });

  await (async () => {
    window.kakao.maps.event.addListener(marker, 'click', async () => {
      await displayPlaceInfo(map, overlay, marker, place);
      await getDistance(marker);
      map.panTo(new window.kakao.maps.LatLng(+place.y, +place.x));
    });
  })();

  markers.push(marker);
};

export const getSearchMap = (
  map: Map,
  overlay: Overlay,
  keyword: SearchKeyword,
  setSearch: Dispatch<SetStateAction<string>>,
) => {
  if (keyword === '') return;
  overlay.setMap(null);
  removeAllMarkers();

  function displayPlace(result: SearchResult) {
    const bounds = new window.kakao.maps.LatLngBounds();

    result.forEach((place: Place) => {
      getMarker(map, overlay, place);
      bounds.extend(new window.kakao.maps.LatLng(+place.y, +place.x));
    });

    map.setBounds(bounds);
  }

  function placesSearchCB(result: SearchResult, status: SearchStatus) {
    if (status === 'OK') {
      setSearch(keyword);
      displayPlace(result);
    } else if (status === 'ZERO_RESULT') {
      setSearch('');
      alert('검색 결과가 존재하지 않습니다.');
    }
  }

  const ps = new window.kakao.maps.services.Places();
  ps.keywordSearch(keyword, placesSearchCB);
};

const getMap = (
  setMap: Dispatch<SetStateAction<Map | undefined>>,
  mapRef: MutableRefObject<null>,
  location: LatLng,
) => {
  const options = {
    center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
    level: 3,
  };

  const kakaoMap = new window.kakao.maps.Map(mapRef.current, options);
  setMap(kakaoMap);
};

export default getMap;
