import React, { Dispatch, SetStateAction, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { BsX, BsGeoAltFill } from 'react-icons/bs';
import { SearchKeyword } from '@types';
import { getSearchMap } from '../../api/getMap';
import MapContext from '../../context/MapContext';

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
  setShow: (show: boolean) => void;
  setPrevSearchKeywords: (keyword: (prev: Array<SearchKeyword>) => SearchKeyword[]) => void;
  onButtonClick: (event: string) => void;
}

function SearchHistoryLi(props: SearchHistoryLiProps) {
  const { keyword, setSearchKeyword, setShow, setPrevSearchKeywords, onButtonClick } = props;
  const { map, overlay } = useContext(MapContext);

  const handleClickSearch = useCallback(() => {
    getSearchMap(map, overlay, keyword, setSearchKeyword);
    setPrevSearchKeywords((prevKeywords: Array<SearchKeyword>) => [...new Set([keyword, ...prevKeywords])]);
    setShow(false);
  }, [map, overlay, keyword, setSearchKeyword, setShow, setPrevSearchKeywords]);

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
