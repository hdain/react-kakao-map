import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import {
  KakaoMap,
  LatLng,
  Map,
  Marker,
  OverlayMapTypeId,
  Place,
  SearchKeyword,
  SearchResult,
  SearchStatus,
} from '@types';
import { getOverlayContent } from '../utils';

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

const getLatLng = (location: LatLng) => new window.kakao.maps.LatLng(location.latitude, location.longitude);

const getDistance = (currentLocation: LatLng, marker: Marker): string => {
  const markerPosition = marker.getPosition();
  const polyline = new window.kakao.maps.Polyline({
    path: [getLatLng(currentLocation), getLatLng(markerPosition)],
  });

  let distance = `${Math.round(polyline.getLength())}`;
  if (+distance >= 1000) distance = `${(+distance / 1000).toFixed(1)}km`;
  else distance += 'm';

  return distance;
};

const removeAllMarkers = (markers: Array<Marker>) => {
  markers.forEach((marker: Marker) => marker.setMap(null));
  markers.splice(0);
};

const displayPlaceInfo = (kakaoMap: KakaoMap, marker: Marker, place: Place, currentLocation: LatLng) => {
  const { map, overlay } = kakaoMap;
  const closeOverlay = () => overlay.setMap(null);
  const distance = getDistance(currentLocation, marker);
  const content = getOverlayContent(place, closeOverlay, distance);
  const position = getLatLng({ latitude: +place.y, longitude: +place.x });

  overlay.setContent(content);
  overlay.setMap(map);
  overlay.setPosition(position);
};

const getMarker = (kakaoMap: KakaoMap, place: Place, currentLocation: LatLng) => {
  const { map, markers } = kakaoMap;
  const marker = new window.kakao.maps.Marker({
    map,
    position: getLatLng({ latitude: +place.y, longitude: +place.x }),
  });

  (() => {
    window.kakao.maps.event.addListener(marker, 'click', () => {
      displayPlaceInfo(kakaoMap, marker, place, currentLocation);
      getDistance(currentLocation, marker);
      map.panTo(getLatLng({ latitude: +place.y, longitude: +place.x }));
    });
  })();

  markers.push(marker);
};

const displayPlaces = (kakaoMap: KakaoMap, result: SearchResult, currentLocation: LatLng) => {
  const { map } = kakaoMap;
  const bounds = new window.kakao.maps.LatLngBounds();

  result.forEach((place: Place) => {
    getMarker(kakaoMap, place, currentLocation);
    bounds.extend(getLatLng({ latitude: +place.y, longitude: +place.x }));
  });

  map.setBounds(bounds);
};

export const getSearchMap = (
  kakaoMap: KakaoMap,
  keyword: SearchKeyword,
  setSearchKeyword: Dispatch<SetStateAction<string>>,
  currentLocation: LatLng,
) => {
  const { overlay, markers } = kakaoMap;
  overlay.setMap(null);
  removeAllMarkers(markers);

  function placesSearchCB(result: SearchResult, status: SearchStatus) {
    if (status === 'OK') {
      setSearchKeyword(keyword);
      displayPlaces(kakaoMap, result, currentLocation);
    }

    if (status === 'ZERO_RESULT') {
      setSearchKeyword('');
      alert('검색 결과가 존재하지 않습니다.');
    }
  }

  const ps = new window.kakao.maps.services.Places();
  ps.keywordSearch(keyword, placesSearchCB);
};

export const getMap = (setMap: any, mapRef: MutableRefObject<null>, location: LatLng) => {
  const options = {
    center: getLatLng(location),
    level: 3,
  };

  setMap({
    map: new window.kakao.maps.Map(mapRef.current, options) || {},
    overlay: new window.kakao.maps.CustomOverlay({ zIndex: 1 }) || {},
  });
};
