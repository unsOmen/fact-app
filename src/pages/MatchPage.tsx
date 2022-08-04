import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, Result, Button, PageHeader } from "antd";
import { FrownOutlined } from '@ant-design/icons';
import MatchForm from "../components/MatchForm";
import MatchContextProvider from "../context/MatchContextProvider";


const { Content } = Layout;

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
      <Content className="match-content">
        {
          matchId ?
            (
              <MatchContextProvider>
                <MatchForm matchId={matchId} />
              </MatchContextProvider>
            ) : renderMatchNotFound()
        }
      </Content>
    </Layout>
  )
};

export default MatchPage;