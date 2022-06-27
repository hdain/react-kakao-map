import React from "react";
import styled from "styled-components";
import { BsX } from "react-icons/bs";

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
  padding: 5px 0;
`;

const ListLi = styled.li`
  padding: 5px 0;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 19px;
  color: #777;
  padding: 0;
`;

const SearchHistory = () => {
  return (
    <Container>
      <HistoryTitle>최근 검색어</HistoryTitle>
      <HistoryList>
        <ListLi>
          <span>검색어1</span>
          <Button>
            <BsX />
          </Button>
        </ListLi>
        <ListLi>
          <span>검색어1</span>
          <Button>
            <BsX />
          </Button>
        </ListLi>
        <ListLi>
          <span>검색어1</span>
          <Button>
            <BsX />
          </Button>
        </ListLi>
      </HistoryList>
    </Container>
  );
};

export default SearchHistory;
