import React from "react";
import { Layout, Row, Card } from "antd";
import SearchForm from "../components/SearchForm";


export const SearchPage = () => {
  return (
    <Layout>
      <Row justify="center" align="middle" className="h100">
        <SearchForm />
      </Row>
    </Layout>
  );
};

export default SearchPage;