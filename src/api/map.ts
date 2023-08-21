import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { LatLng, Map, Marker, OverlayMapTypeId, Place, SearchKeyword, SearchResult, SearchStatus } from '@types';
import { KakaoMap } from '../context';
import { getGeolocation, getOverlayContent } from '../utils';

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

const getDistance = async (marker: Marker): Promise<string> => {
  const currentPosition = await getGeolocation();
  const markerPosition = marker.getPosition();
  const polyline = new window.kakao.maps.Polyline({
    path: [getLatLng(currentPosition), getLatLng(markerPosition)],
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

const displayPlaceInfo = async (kakaoMap: KakaoMap, marker: Marker, place: Place) => {
  const { map, overlay } = kakaoMap;
  const closeOverlay = () => overlay.setMap(null);
  const distance = await getDistance(marker);
  const content = getOverlayContent(place, closeOverlay, distance);
  const position = getLatLng({ latitude: +place.y, longitude: +place.x });

  overlay.setContent(content);
  overlay.setMap(map);
  overlay.setPosition(position);
};

const getMarker = async (kakaoMap: KakaoMap, place: Place) => {
  const { map, markers } = kakaoMap;
  const marker = new window.kakao.maps.Marker({
    map,
    position: getLatLng({ latitude: +place.y, longitude: +place.x }),
  });

  await (async () => {
    window.kakao.maps.event.addListener(marker, 'click', async () => {
      await displayPlaceInfo(kakaoMap, marker, place);
      await getDistance(marker);
      map.panTo(getLatLng({ latitude: +place.y, longitude: +place.x }));
    });
  })();

  markers.push(marker);
};

const displayPlaces = (kakaoMap: KakaoMap, result: SearchResult) => {
  const { map } = kakaoMap;
  const bounds = new window.kakao.maps.LatLngBounds();

  result.forEach((place: Place) => {
    getMarker(kakaoMap, place);
    bounds.extend(getLatLng({ latitude: +place.y, longitude: +place.x }));
  });

  map.setBounds(bounds);
};

export const getSearchMap = (
  kakaoMap: KakaoMap,
  keyword: SearchKeyword,
  setSearch: Dispatch<SetStateAction<string>>,
) => {
  const { overlay, markers } = kakaoMap;
  overlay.setMap(null);
  removeAllMarkers(markers);

  function placesSearchCB(result: SearchResult, status: SearchStatus) {
    if (status === 'OK') {
      setSearch(keyword);
      displayPlaces(kakaoMap, result);
    } else if (status === 'ZERO_RESULT') {
      setSearch('');
      alert('검색 결과가 존재하지 않습니다.');
    }
  }

  const ps = new window.kakao.maps.services.Places();
  ps.keywordSearch(keyword, placesSearchCB);
};

export const getMap = (
  setMap: Dispatch<SetStateAction<Map | undefined>>,
  mapRef: MutableRefObject<null>,
  location: LatLng,
) => {
  const options = {
    center: getLatLng(location),
    level: 3,
  };

  setMap({
    map: new window.kakao.maps.Map(mapRef.current, options) || {},
    overlay: new window.kakao.maps.CustomOverlay({ zIndex: 1 }) || {},
    markers: [],
  });
};