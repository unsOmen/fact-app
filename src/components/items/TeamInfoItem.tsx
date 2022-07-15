import React, { FC } from "react";
import { Card, Avatar, Space, Typography, Row } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { IPlayer, ITeam } from "../../models/Models";


const { Title } = Typography;

interface Props {
  team: ITeam;
}

const { Meta } = Card;

const TeamInfoItem: FC<Props> = ({ team }) => {

  const renderRosters = () => {
    const players = team.roster.map((player: IPlayer) => {
      return (
        <Meta
          avatar={<Avatar src={player.avatar} icon={<UserOutlined />} size={"large"} />}
          title={player.nickname}
        // description={player.player_id}
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
      <Card title={renderTeamName()} style={{ width: 300 }}>
        {
          renderRosters()
        }
      </Card>
    </>
  );
};

export default TeamInfoItem;