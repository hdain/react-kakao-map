import React, { Dispatch, SetStateAction, useCallback } from 'react';
import styled from 'styled-components';
import { BsX, BsGeoAltFill } from 'react-icons/bs';
import { SearchKeyword } from '@types';
import { getSearchMap } from '../../api';
import { useRemoveSearchHistory, useGeolocation, useMap, useAddSearchHistory } from '../../hooks';

const ListLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.button`
  display: flex;
  align-items: flex-start;
  font-size: 15px;
  padding: 7px 0;
  background: none;
  border: none;
  color: #999;
  flex-grow: 1;
  cursor: pointer;
`;

const KeywordName = styled.span`
  cursor: pointer;
  padding-left: 9px;
  color: #000;
`;

const Button = styled.button`
  display: flex;
  background: none;
  border: none;
  font-size: 19px;
  color: #777;
  padding: 0;
  vertical-align: middle;
  cursor: pointer;
`;

export interface SearchHistoryLiProps {
  keyword: SearchKeyword;
  setSearchKeyword: Dispatch<SetStateAction<SearchKeyword>>;
  setIsShow: (show: boolean) => void;
}

function SearchHistoryLi(props: SearchHistoryLiProps) {
  const { keyword, setIsShow, setSearchKeyword } = props;
  const map = useMap();
  const location = useGeolocation();
  const addSearchHistory = useAddSearchHistory();
  const removeSearchHistory = useRemoveSearchHistory();

  const handleClickKeyword = useCallback(
    (e: React.MouseEvent) => {
      getSearchMap(map, keyword, setSearchKeyword, location);
      addSearchHistory(keyword);
      setIsShow(false);
      e.preventDefault();
    },
    [map, keyword, setSearchKeyword, location, addSearchHistory, setIsShow],
  );

  const handleRemoveKeyword = useCallback(
    (removeKeyword: SearchKeyword) => {
      removeSearchHistory(removeKeyword);
    },
    [removeSearchHistory],
  );

  return (
    <ListLi>
      <Text onClick={handleClickKeyword}>
        <BsGeoAltFill />
        <KeywordName>{keyword}</KeywordName>
      </Text>
      <Button onClick={() => handleRemoveKeyword(keyword)}>
        <BsX />
      </Button>
    </ListLi>
  );
}

export default SearchHistoryLi;
