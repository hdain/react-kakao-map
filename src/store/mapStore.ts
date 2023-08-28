import { create } from 'zustand';
import { KakaoMap } from '@types';

interface MapState {
  kakaoMap: KakaoMap;
}

interface MapActions {
  setKakaoMap: (content: Partial<KakaoMap>) => void;
}

const useMapStore = create<MapState & MapActions>((set, get) => ({
  kakaoMap: {
    map: {},
    overlay: {},
    markers: [],
  },
  setKakaoMap: (content: Partial<KakaoMap>) => set(() => ({ kakaoMap: { ...get().kakaoMap, ...content } })),
}));

export default useMapStore;
