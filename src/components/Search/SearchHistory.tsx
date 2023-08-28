import React from 'react';
import styled from 'styled-components';
import { SearchKeyword } from '@types';
import SearchHistoryLi, { SearchHistoryLiProps } from './SearchHistoryLi';
import { useSearchHistory } from '../../hooks';

const Container = styled.div`
  position: absolute;
  top: 42px;
  left: 0;
  right: 0;
  border: 1px solid #777;
  border-top: 1px solid #ccc;
  padding: 15px 15px 5px;
  border-radius: 0 0 5px 5px;
  background: #fff;
`;

const HistoryTitle = styled.div`
  color: #777;
  font-size: 15px;
`;

const HistoryList = styled.ul`
  margin: 0;
  padding: 10px 0 5px;
`;

type SearchHistoryProps = Omit<SearchHistoryLiProps, 'keyword'>;

function SearchHistory(props: SearchHistoryProps) {
  const searchHistory = useSearchHistory();

  return (
    <Container>
      <HistoryTitle>최근 검색어</HistoryTitle>
      <HistoryList>
        {searchHistory.map((keyword: SearchKeyword) => (
          <SearchHistoryLi key={keyword} keyword={keyword} {...props} />
        ))}
      </HistoryList>
    </Container>
  );
}

export default SearchHistory;
