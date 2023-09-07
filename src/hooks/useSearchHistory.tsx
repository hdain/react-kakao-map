import { useSearchHistoryStore } from '../store';

export const useSearchHistory = () => useSearchHistoryStore((state) => state.searchHistory);
export const useAddSearchHistory = () => useSearchHistoryStore((state) => state.addSearchHistory);
export const useRemoveSearchHistory = () => useSearchHistoryStore((state) => state.removeSearchHistory);
