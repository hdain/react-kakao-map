import React, { useCallback } from "react";
import styled from "styled-components";

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

const SearchForm = ({ setSearch, text, setText }) => {
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setSearch(text);
    },
    [setSearch, text]
  );

  const handleChange = useCallback(
    (e) => {
      setText(e.target.value);
    },
    [setText]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="검색어를 입력해주세요"
      />
      <Button type="submit">🔍</Button>
    </Form>
  );
};

export default SearchForm;
