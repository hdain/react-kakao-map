import React from "react";
import styled from "styled-components";
import { BsX } from "react-icons/bs";

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
  cursor: pointer;
`;

const SearchHistoryLi = ({ place, handleRemovePlace }) => {
  return (
    <ListLi>
      <span>{place}</span>
      <Button onClick={() => handleRemovePlace(place)}>
        <BsX />
      </Button>
    </ListLi>
  );
};

export default SearchHistoryLi;
