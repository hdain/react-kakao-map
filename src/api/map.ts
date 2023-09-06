import { MutableRefObject } from 'react';
import {
  KakaoMap,
  LatLng,
  Map,
  Marker,
  OverlayMapTypeId,
  Place,
  SearchKeyword,
  SearchPagination,
  SearchResult,
  SearchStatus,
} from '@types';
import { getOverlayContent } from '../utils';
import { useMapStore, useSearchStore } from '../store';

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
    path: [getLatLng(currentLocation), markerPosition],
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

export const getSearchMap = (kakaoMap: KakaoMap, keyword: SearchKeyword, currentLocation: LatLng) => {
  const { overlay, markers } = kakaoMap;
  overlay.setMap(null);
  removeAllMarkers(markers);

  function placesSearchCB(result: SearchResult, status: SearchStatus, pagination: SearchPagination) {
    const { setSearchKeyword } = useSearchStore.getState();

    if (status === 'OK') {
      setSearchKeyword(keyword);
      displayPlaces(kakaoMap, result, currentLocation);
    }

    if (status === 'ZERO_RESULT') {
      setSearchKeyword('');
      alert('검색 결과가 존재하지 않습니다.');
    }

    if (status === 'ERROR') {
      setSearchKeyword('');
      alert('검색에 실패했습니다.');
    }

    useSearchStore.getState().setSearchResult({ places: result, pagination });
  }

  const ps = new window.kakao.maps.services.Places();
  ps.keywordSearch(keyword, placesSearchCB);
};

export const getMap = (mapRef: MutableRefObject<null>, location: LatLng) => {
  const options = {
    center: getLatLng(location),
    level: 3,
  };

  useMapStore.getState().setKakaoMap({
    map: new window.kakao.maps.Map(mapRef.current, options) || {},
    overlay: new window.kakao.maps.CustomOverlay({ zIndex: 1 }) || {},
  });
};
