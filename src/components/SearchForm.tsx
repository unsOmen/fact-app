import React, { memo } from "react";
import { Input } from 'antd';
import { useNavigate } from "react-router-dom";

const { Search } = Input;


const SearchForm = () => {

  const navigate = useNavigate();


  const handleSearch = (matchId: any) => {
    navigate(`/${matchId}`);
  };

  return (
    <>
      <Search
        className="search-match"
        placeholder="Input search csgo match id"
        size="large"
        onSearch={handleSearch}
      />
    </>
  );
};

export default memo(SearchForm);