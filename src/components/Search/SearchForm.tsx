import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { SearchKeyword } from '@types';
import { getSearchMap } from '../../api';
import SearchHistory from './SearchHistory';
import useMap from '../../hooks/useMap';

const Form = styled.form`
  position: fixed;
  z-index: 2;
  top: 20px;
  left: 50%;
  max-width: 700px;
  width: 90%;
  transform: translateX(-50%);
`;

const Input = styled.input`
  width: 100%;
  font-size: 20px;
  padding: 10px 15px;
  box-sizing: border-box;
  border: 1px solid #777;
  border-radius: 5px;
`;

const Button = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 25px;
  cursor: pointer;
`;

function SearchForm() {
  const kakaoMap = useMap();
  const historyRef = useRef<HTMLFormElement>(null);
  const [isShowSearchHistory, setIsShowSearchHistory] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<SearchKeyword>('');
  const [prevSearchKeywords, setPrevSearchKeywords] = useState<Array<SearchKeyword>>(
    JSON.parse(localStorage.getItem('searchPlaces') || '[]'),
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchKeyword(e.target.value);
    },
    [setSearchKeyword],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      getSearchMap(kakaoMap, searchKeyword, setSearchKeyword);
      setPrevSearchKeywords((prev) => [...new Set([searchKeyword, ...prev])]);
      setIsShowSearchHistory(false);
      e.preventDefault();
    },
    [kakaoMap, searchKeyword],
  );

  const handleRemoveKeyword = useCallback(
    (keyword: SearchKeyword) => {
      const filteredKeywords = prevSearchKeywords.filter((prevKeyword: SearchKeyword) => keyword !== prevKeyword);
      setPrevSearchKeywords(filteredKeywords);
    },
    [prevSearchKeywords],
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

  useEffect(() => {
    localStorage.setItem('searchPlaces', JSON.stringify(prevSearchKeywords));
  }, [prevSearchKeywords]);

  return (
    <Form onSubmit={handleSubmit} ref={historyRef}>
      <>
        <Input
          type="text"
          value={searchKeyword}
          onChange={handleChange}
          placeholder="검색어를 입력해주세요"
          onClick={() => setIsShowSearchHistory(true)}
        />
        <Button type="submit">🔍</Button>
      </>
      {isShowSearchHistory && (
        <SearchHistory
          setSearchKeyword={setSearchKeyword}
          setShow={setIsShowSearchHistory}
          setPrevSearchKeywords={setPrevSearchKeywords}
          prevSearchKeywords={prevSearchKeywords}
          onButtonClick={handleRemoveKeyword}
        />
      )}
    </Form>
  );
}

export default SearchForm;
