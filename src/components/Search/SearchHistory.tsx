import React from 'react';
import { SearchKeyword } from '@types';
import SearchHistoryLi, { SearchHistoryLiProps } from './SearchHistoryLi';
import { useSearchHistory } from '../../hooks';

type SearchHistoryProps = Omit<SearchHistoryLiProps, 'keyword'>;

function SearchHistory(props: SearchHistoryProps) {
  const searchHistory = useSearchHistory();

  return (
    <div className="absolute left-0 right-0 top-14 rounded-b border border-gray-300 bg-white p-4">
      <div className="text-sm text-gray-600">최근 검색어</div>
      <ul className="mt-4 flex flex-col gap-2">
        {searchHistory.map((keyword: SearchKeyword) => (
          <SearchHistoryLi key={keyword} keyword={keyword} {...props} />
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;
