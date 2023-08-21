import { createContext } from 'react';
import { Map, Marker, Overlay } from '@types';

export interface KakaoMap {
  map: Map;
  overlay: Overlay;
  markers: Array<Marker>;
}

const MapContext = createContext<KakaoMap>({
  map: {},
  overlay: {},
  markers: [],
});

export default MapContext;
