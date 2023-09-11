import React, { useState, useCallback, useEffect, useRef } from 'react';
import { getSearchMap } from '../../api';
import SearchHistory from './SearchHistory';
import { useGeolocation, useAddSearchHistory, useSearchKeyword, useSetSearchKeyword } from '../../hooks';

function SearchForm() {
  const location = useGeolocation();
  const searchKeyword = useSearchKeyword();
  const setSearchKeyword = useSetSearchKeyword();
  const historyRef = useRef<HTMLFormElement>(null);
  const addSearchHistory = useAddSearchHistory();
  const [isShowSearchHistory, setIsShowSearchHistory] = useState<boolean>(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchKeyword(e.target.value);
    },
    [setSearchKeyword],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      getSearchMap({ keyword: searchKeyword, location });
      addSearchHistory(searchKeyword);
      setIsShowSearchHistory(false);
      e.preventDefault();
    },
    [searchKeyword, location, addSearchHistory],
  );

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (historyRef.current && !historyRef.current.contains(e.target as Node)) {
        setIsShowSearchHistory(false);
      }
    },
    [historyRef, setIsShowSearchHistory],
  );

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <form
      onSubmit={handleSubmit}
      ref={historyRef}
      className="fixed left-1/2 top-6 z-10 w-5/6 max-w-screen-md -translate-x-1/2 transform"
    >
      <input
        type="text"
        value={searchKeyword}
        onChange={handleChange}
        placeholder="검색어를 입력해주세요"
        onClick={() => setIsShowSearchHistory(true)}
        className="w-full rounded border border-gray-300 p-4 text-lg"
      />
      <button
        type="submit"
        className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer border-none bg-transparent text-2xl"
      >
        🔍
      </button>
      {isShowSearchHistory && <SearchHistory setIsShow={setIsShowSearchHistory} />}
    </form>
  );
}

export default SearchForm;
