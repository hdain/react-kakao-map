import React, { useCallback } from 'react';
import { BsX, BsGeoAltFill } from 'react-icons/bs';
import { SearchKeyword } from '@types';
import { getSearchMap } from '../../api';
import { useRemoveSearchHistory, useGeolocation, useAddSearchHistory } from '../../hooks';

export interface SearchHistoryLiProps {
  keyword: SearchKeyword;
  setIsShow: (show: boolean) => void;
}

function SearchHistoryLi(props: SearchHistoryLiProps) {
  const { keyword, setIsShow } = props;
  const location = useGeolocation();
  const addSearchHistory = useAddSearchHistory();
  const removeSearchHistory = useRemoveSearchHistory();

  const handleClickKeyword = useCallback(
    (e: React.MouseEvent) => {
      getSearchMap({ keyword, location });
      addSearchHistory(keyword);
      setIsShow(false);
      e.preventDefault();
    },
    [keyword, location, addSearchHistory, setIsShow],
  );

  const handleRemoveKeyword = useCallback(
    (removeKeyword: SearchKeyword) => {
      removeSearchHistory(removeKeyword);
    },
    [removeSearchHistory],
  );

  return (
    <li className="flex items-center justify-between">
      <button
        type="button"
        onClick={handleClickKeyword}
        className="flex flex-grow cursor-pointer items-start items-center border-none bg-transparent px-0 text-base text-gray-600"
      >
        <BsGeoAltFill />
        <span className="cursor-pointer pl-2 text-black">{keyword}</span>
      </button>
      <button
        type="button"
        onClick={() => handleRemoveKeyword(keyword)}
        className="flex cursor-pointer items-center border-none bg-transparent p-0 text-xl text-gray-600"
      >
        <BsX />
      </button>
    </li>
  );
}

export default SearchHistoryLi;
