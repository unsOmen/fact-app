import React, { memo } from "react";
import { Input } from 'antd';
import { useNavigate } from "react-router-dom";

const {Search} = Input;


const SearchForm = () => {

  const navigate = useNavigate();


  const handleSearch = (e: any) => {
    console.log("SEARCH!!!", e);
    navigate(`/${e}`);
  };

  return (
    <>
      <Search placeholder="input search text" onSearch={handleSearch} style={{ width: 200 }} />
    </>
  );
};

export default memo(SearchForm);