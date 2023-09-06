import { create } from 'zustand';
import { SearchKeyword, SearchResult } from '@types';

interface SearchState {
  searchKeyword: SearchKeyword;
  searchResult: SearchResult;
}

interface SearchActions {
  setSearchKeyword: (keyword: string) => void;
  setSearchResult: (result: SearchResult) => void;
}

const useSearchStore = create<SearchState & SearchActions>((set, get) => ({
  searchKeyword: '',
  searchResult: {
    places: [],
    pagination: {},
  },
  setSearchKeyword: (keyword: string) => set(() => ({ searchKeyword: keyword })),
  setSearchResult: (result: SearchResult) => set(() => ({ searchResult: { ...get().searchResult, ...result } })),
}));

export default useSearchStore;
