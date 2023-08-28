declare global {
  interface Window {
    kakao: any;
  }
}

export type Map = any;
export type Overlay = any;
export type Marker = any;
export type KakaoMap = {
  map: Map;
  overlay: Overlay;
  markers: Array<Marker>;
};

export type OverlayMapTypeId = 'TRAFFIC' | 'BICYCLE' | 'TERRAIN';
export type SearchStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';
export type SearchResult = Array<Place>;
export type SearchKeyword = string;

export interface LatLng {
  latitude: number;
  longitude: number;
}
export interface Place {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}
