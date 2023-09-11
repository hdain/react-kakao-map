import { shallow } from 'zustand/shallow';
import { searchHistoryStore } from '../store';

export const useSearchHistory = () => searchHistoryStore((state) => state.searchHistory, shallow);
export const useAddSearchHistory = () => searchHistoryStore((state) => state.addSearchHistory);
export const useRemoveSearchHistory = () => searchHistoryStore((state) => state.removeSearchHistory);
