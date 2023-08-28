import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { SearchKeyword } from '@types';
import { getSearchMap } from '../../api';
import SearchHistory from './SearchHistory';
import { useGeolocation, useMap, useAddSearchHistory } from '../../hooks';

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
  const map = useMap();
  const location = useGeolocation();
  const historyRef = useRef<HTMLFormElement>(null);
  const addSearchHistory = useAddSearchHistory();
  const [isShowSearchHistory, setIsShowSearchHistory] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<SearchKeyword>('');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchKeyword(e.target.value);
    },
    [setSearchKeyword],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      getSearchMap(map, searchKeyword, setSearchKeyword, location);
      addSearchHistory(searchKeyword);
      setIsShowSearchHistory(false);
      e.preventDefault();
    },
    [map, searchKeyword, location, addSearchHistory],
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
      {isShowSearchHistory && <SearchHistory setSearchKeyword={setSearchKeyword} setIsShow={setIsShowSearchHistory} />}
    </Form>
  );
}

export default SearchForm;
