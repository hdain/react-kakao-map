import { shallow } from 'zustand/shallow';
import { useSearchStore } from '../store';

export const useSearchKeyword = () => useSearchStore((state) => state.searchKeyword);
export const useSetSearchKeyword = () => useSearchStore((state) => state.setSearchKeyword);
export const useSearchResult = () => useSearchStore((state) => state.searchResult, shallow);
