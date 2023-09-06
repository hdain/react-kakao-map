import { searchHistoryStore } from '../store';

export const useSearchHistory = () => searchHistoryStore((state) => state.searchHistory);
export const useAddSearchHistory = () => searchHistoryStore((state) => state.addSearchHistory);
export const useRemoveSearchHistory = () => searchHistoryStore((state) => state.removeSearchHistory);
