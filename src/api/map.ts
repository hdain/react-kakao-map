import { MutableRefObject } from 'react';
import {
  LatLng,
  Marker,
  OverlayMapTypeId,
  Place,
  SearchKeyword,
  SearchPagination,
  SearchResult,
  SearchStatus,
} from '@types';
import { getOverlayContent } from '../utils';
import { mapStore, searchStore } from '../store';

export const zoomIn = () => {
  const { map } = mapStore.getState().kakaoMap;
  const level = map.getLevel();
  map.setLevel(level - 1);
};

export const zoomOut = () => {
  const { map } = mapStore.getState().kakaoMap;
  const level = map.getLevel();
  map.setLevel(level + 1);
};

export const addOverlayMapTypeId = (type: OverlayMapTypeId) => {
  const { map } = mapStore.getState().kakaoMap;
  map.addOverlayMapTypeId(window.kakao.maps.MapTypeId[type]);
};

export const removeOverlayMapTypeId = (type: OverlayMapTypeId) => {
  const { map } = mapStore.getState().kakaoMap;
  map.removeOverlayMapTypeId(window.kakao.maps.MapTypeId[type]);
};

const getLatLng = (location: LatLng) => new window.kakao.maps.LatLng(location.latitude, location.longitude);

const getDistance = (marker: Marker): string => {
  const markerPosition = marker.getPosition();
  const polyline = new window.kakao.maps.Polyline({
    path: [getLatLng(mapStore.getState().location), markerPosition],
  });

  let distance = `${Math.round(polyline.getLength())}`;
  if (+distance >= 1000) distance = `${(+distance / 1000).toFixed(1)}km`;
  else distance += 'm';

  return distance;
};

const removeAllMarkers = () => {
  const { markers } = mapStore.getState().kakaoMap;
  markers.forEach((marker: Marker) => marker.setMap(null));
  markers.splice(0);
};

const displayPlaceInfo = ({ marker, place }: { marker: Marker; place: Place }) => {
  const { map, overlay } = mapStore.getState().kakaoMap;
  const distance = getDistance(marker);
  const content = getOverlayContent({ place, distance });
  const position = getLatLng({ latitude: +place.y, longitude: +place.x });

  overlay.setContent(content);
  overlay.setMap(map);
  overlay.setPosition(position);

  const closeBtn = document.getElementById(place.id);
  closeBtn.onclick = () => overlay.setMap(null);
};

const getMarker = (place: Place) => {
  const { map, markers } = mapStore.getState().kakaoMap;
  const marker = new window.kakao.maps.Marker({
    map,
    position: getLatLng({ latitude: +place.y, longitude: +place.x }),
  });

  (() => {
    window.kakao.maps.event.addListener(marker, 'click', () => {
      displayPlaceInfo({ marker, place });
      getDistance(marker);
      map.panTo(getLatLng({ latitude: +place.y, longitude: +place.x }));
    });
  })();

  markers.push(marker);
};

const displayPlaces = (result: SearchResult) => {
  const { map } = mapStore.getState().kakaoMap;
  const bounds = new window.kakao.maps.LatLngBounds();

  result.forEach((place: Place) => {
    getMarker(place);
    bounds.extend(getLatLng({ latitude: +place.y, longitude: +place.x }));
  });

  map.setBounds(bounds);
};

export const getSearchMap = ({ keyword, location }: { keyword: SearchKeyword; location: LatLng }) => {
  const { overlay } = mapStore.getState().kakaoMap;
  mapStore.getState().setLocation(location);
  overlay.setMap(null);
  removeAllMarkers();

  function placesSearchCB(result: SearchResult, status: SearchStatus, pagination: SearchPagination) {
    const { setSearchKeyword } = searchStore.getState();

    if (status === 'OK') {
      setSearchKeyword(keyword);
      displayPlaces(result);
    }

    if (status === 'ZERO_RESULT') {
      setSearchKeyword('');
      alert('검색 결과가 존재하지 않습니다.');
    }

    if (status === 'ERROR') {
      setSearchKeyword('');
      alert('검색에 실패했습니다.');
    }

    searchStore.getState().setSearchResult({ places: result, pagination });
  }

  const ps = new window.kakao.maps.services.Places();
  ps.keywordSearch(keyword, placesSearchCB);
};

export const getMap = ({ mapRef, location }: { mapRef: MutableRefObject<null>; location: LatLng }) => {
  const options = {
    center: getLatLng(location),
    level: 3,
  };

  mapStore.getState().setKakaoMap({
    map: new window.kakao.maps.Map(mapRef.current, options) || {},
    overlay: new window.kakao.maps.CustomOverlay({ zIndex: 1 }) || {},
  });

  mapStore.getState().setLocation(location);
};
