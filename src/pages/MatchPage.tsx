import React, { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, Result, Button, PageHeader } from "antd";
import { FrownOutlined } from '@ant-design/icons';
import MatchForm from "../components/MatchForm";


const MatchPage = () => {

  const navigate = useNavigate();
  const { matchId } = useParams();
  

  const backHome = () => {
    navigate("/")
  };

  const renderMatchNotFound = () => {
    return (
      <Result
        icon={<FrownOutlined style={{ color: "orange" }} />}
        title="Oops, match not found!"
        extra={<Button onClick={backHome}>To Search</Button>}
      />
    );
  };

  return (
    <Layout>
      <PageHeader
        onBack={backHome}
        title="MATCH"
      />
      {
        matchId ? <MatchForm matchId={matchId} /> : renderMatchNotFound()
      }
    </Layout>
  )
};

export default MatchPage;