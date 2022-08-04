import React, { FC } from "react";
import { Card, Avatar, Space, Typography, Row } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { IPlayer, ITeam } from "../../models/Match";


const { Title } = Typography;
const { Meta } = Card;

interface Props {
  team: ITeam;
}

const TeamInfoItem: FC<Props> = ({ team }) => {

  const renderRosters = () => {
    const players = team.roster.map((player: IPlayer) => {
      return (
        <Meta
          key={player.player_id}
          avatar={<Avatar src={player.avatar} icon={<UserOutlined />} size={"large"} />}
          title={player.nickname}
        />
      );
    });
    return (
      <Space direction={"vertical"} size={"large"}>
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