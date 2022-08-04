import React, { memo } from "react";
import { Input } from 'antd';
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const faceitCsgoRoomPath = "https://www.faceit.com/en/csgo/room/";

const SearchForm = () => {

  const navigate = useNavigate();


  const handleSearch = (matchId: string) => {
    navigate(`/${getMatchId(matchId)}`);
  };

  const getMatchId = (matchId: string) => {
    if (matchId.startsWith(faceitCsgoRoomPath)) {
      return matchId.replace(faceitCsgoRoomPath, "");
    }
    return matchId;
  };

  return (
    <>
      <Search
        className="search-match"
        placeholder="Input search csgo match id or room url"
        size="large"
        onSearch={handleSearch}
      />
    </>
  );
};

export default memo(SearchForm);