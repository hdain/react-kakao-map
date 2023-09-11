import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { SearchKeyword } from '@types';

interface SearchHistoryState {
  searchHistory: Array<SearchKeyword>;
}

interface SearchHistoryActions {
  addSearchHistory: (keyword: SearchKeyword) => void;
  removeSearchHistory: (keyword: SearchKeyword) => void;
}

const searchHistoryStore = create<SearchHistoryState & SearchHistoryActions>()(
  persist(
    (set, get) => ({
      searchHistory: [],
      addSearchHistory: (keyword: SearchKeyword) =>
        set(() => ({ searchHistory: [...new Set([keyword, ...get().searchHistory])] })),
      removeSearchHistory: (removeKeyword: SearchKeyword) =>
        set(() => ({
          searchHistory: get().searchHistory.filter((keyword) => removeKeyword !== keyword),
        })),
    }),
    {
      name: 'search-keywords',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default searchHistoryStore;
