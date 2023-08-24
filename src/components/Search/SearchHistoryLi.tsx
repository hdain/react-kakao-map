import React, { Dispatch, SetStateAction, useCallback } from 'react';
import styled from 'styled-components';
import { BsX, BsGeoAltFill } from 'react-icons/bs';
import { SearchKeyword } from '@types';
import { getSearchMap } from '../../api';
import { useGeolocation, useMap } from '../../hooks';

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
  setPrevSearchKeywords: (keyword: (prev: Array<SearchKeyword>) => Array<SearchKeyword>) => void;
  setIsShow: (show: boolean) => void;
  onButtonClick: (event: string) => void;
}

function SearchHistoryLi(props: SearchHistoryLiProps) {
  const { keyword, setSearchKeyword, setIsShow, setPrevSearchKeywords, onButtonClick } = props;
  const kakaoMap = useMap();
  const location = useGeolocation();

  const handleClickSearch = useCallback(() => {
    getSearchMap(kakaoMap, keyword, setSearchKeyword, location);
    setPrevSearchKeywords((prevKeywords: Array<SearchKeyword>) => [...new Set([keyword, ...prevKeywords])]);
    setIsShow(false);
  }, [kakaoMap, keyword, setSearchKeyword, setPrevSearchKeywords, setIsShow, location]);

  return (
    <ListLi>
      <Text onClick={handleClickSearch}>
        <BsGeoAltFill />
        <KeywordName>{keyword}</KeywordName>
      </Text>
      <Button onClick={() => onButtonClick(keyword)}>
        <BsX />
      </Button>
    </ListLi>
  );
}

export default SearchHistoryLi;
