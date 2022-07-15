import React, { FC } from "react";
import { Card, Avatar, Space } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { IPlayer, ITeam } from "../../models/Models";


interface Props {
  team: ITeam;
}

const { Meta } = Card;

export const Team: FC<Props> = ({ team }) => {

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

  return (
    <>
      <Card title={team.name} extra={<a href="#">More</a>} style={{ width: 300 }}>
        {
          renderRosters()
        }
      </Card>
    </>
  );
};