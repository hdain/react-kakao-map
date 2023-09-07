import { shallow } from 'zustand/shallow';
import { useMapStore } from '../store';

export const useMap = () => useMapStore((state) => state.kakaoMap, shallow);
