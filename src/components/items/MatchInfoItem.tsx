import React, { FC } from "react";
import { IMatchInfo } from "../../models/Match";
import { Layout, Row, Typography } from "antd";


const { Title } = Typography;

interface Props {
  matchInfo: IMatchInfo;
}

const MatchInfoItem: FC<Props> = ({ matchInfo }) => {

  return (
    <Layout>
      <Row justify="center" align="middle">
        <Title level={2}>{matchInfo.name}</Title>
      </Row>
      <Row justify="center" align="middle">
        <Title level={3}>{matchInfo.type}</Title>
      </Row>
    </Layout>
  );
};

export default MatchInfoItem;