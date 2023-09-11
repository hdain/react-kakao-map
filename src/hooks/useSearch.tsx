import { shallow } from 'zustand/shallow';
import { searchStore } from '../store';

export const useSearchKeyword = () => searchStore((state) => state.searchKeyword);
export const useSetSearchKeyword = () => searchStore((state) => state.setSearchKeyword);
export const useSearchResult = () => searchStore((state) => state.searchResult, shallow);
