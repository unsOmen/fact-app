import React, { memo } from "react";
import { Input } from 'antd';
import { useNavigate } from "react-router-dom";
import { getMatchId } from "./../utils/MatchUtils";

const { Search } = Input;


const SearchForm = () => {

  const navigate = useNavigate();


  const handleSearch = (matchId: string) => {
    navigate(`/${getMatchId(matchId)}`);
  };

  return (
    <>
      <Search
        className="search-match"
        placeholder="Input search csgo match id or room url"
        size="large"
        autoFocus={true}
        onSearch={handleSearch}
      />
    </>
  );
};

export default memo(SearchForm);