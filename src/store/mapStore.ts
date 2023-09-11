import { createStore } from 'zustand/vanilla';
import { KakaoMap, LatLng } from '@types';

interface MapState {
  kakaoMap: KakaoMap;
  location: LatLng;
}

interface MapActions {
  setKakaoMap: (content: Partial<KakaoMap>) => void;
  setLocation: (location: LatLng) => void;
}

const mapStore = createStore<MapState & MapActions>((set, get) => ({
  kakaoMap: {
    map: {},
    overlay: {},
    markers: [],
  },
  location: { latitude: 37.39525750009229, longitude: 127.11148651523494 },
  setKakaoMap: (content: Partial<KakaoMap>) => set(() => ({ kakaoMap: { ...get().kakaoMap, ...content } })),
  setLocation: (location: LatLng) => set(() => ({ ...get().kakaoMap, location })),
}));

export default mapStore;
