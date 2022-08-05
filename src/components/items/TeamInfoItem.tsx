import React, { FC } from "react";
import { Card, Avatar, Space, Typography, Row, Col, Skeleton } from "antd";
import { UserOutlined, StockOutlined } from '@ant-design/icons';
import { IPlayer, ITeam } from "../../models/Match";
import useMatchContext from "../../context/useMatchContext";


const { Title, Text } = Typography;
const { Meta } = Card;

interface Props {
  team: ITeam;
}

const TeamInfoItem: FC<Props> = ({ team }) => {

  const { info } = useMatchContext();

  const renderRosters = () => {
    const players = team.roster.map((player: IPlayer) => {
      return (
        <Row justify="space-between">
          <Col>
            <Meta
              key={player.player_id}
              avatar={<Avatar src={player.avatar} icon={<UserOutlined />} size={"large"} />}
              title={player.nickname}
            />
          </Col>
          <Col>
            <Space>
              <StockOutlined style={{ opacity: 0.5 }} />
              {
                (info && info.get(player.player_id))
                  ? (<Title level={4}>{info?.get(player.player_id)?.faceit_elo}</Title>)
                  : (<Skeleton.Input size="small" />)
              }

            </Space>
          </Col>
        </Row>

      );
    });
    return (
      <Space direction={"vertical"} size={"large"} style={{ width: "100%" }}>
        {players}
      </Space>
    );
  };

  const renderTeamName = () => {
    return (
      <Row justify="center">
        <Title level={3}>{team.name}</Title>
      </Row>
    );
  }

  return (
    <>
      <Card title={renderTeamName()} style={{ width: "100%" }}>
        {
          renderRosters()
        }
      </Card>
    </>
  );
};

export default TeamInfoItem;