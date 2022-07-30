import React, { FC, useState } from "react";
import { IMapEntity, ITeams, IVoting } from "../../models/Match";
import { Card, Avatar, Space, Typography, Row, List, Skeleton } from "antd";
import { PictureOutlined } from '@ant-design/icons';
import { IPlayerStats } from "../../models/PlayerStats";
import { IPlayerAnalysis } from "../../models/Analysis";
import FaceitService from "../../api/FaceitService";
import MapAnalysisItem from "./MapAnalysisItem";


const { Title } = Typography;
const { Meta } = Card;

interface Props {
  teams: ITeams;
  voting: IVoting;
}

const AnalysisItem: FC<Props> = ({ teams, voting }) => {

  const [stats, setStats] = useState<Map<string, IPlayerStats> | null>(null);


  React.useEffect(() => {
    const playersStats = new Map<string, IPlayerStats>();

    const players = teams.faction1.roster.concat(teams.faction2.roster);
    console.debug("Players: ", players);

    const teamsStats = players.map(player => {
      return new Promise<IPlayerAnalysis>((resolve, reject) => {
        FaceitService.getPlayerStats(player.player_id)
          .then(rs => {
            const playerAnalysis: IPlayerAnalysis = {
              playerId: player.player_id,
              stats: rs
            };
            resolve(playerAnalysis);
          })
          .catch(e => {
            reject(e);
          });
      });
    });

    Promise.all(teamsStats).then(values => {
      values.forEach(analysis => {
        playersStats.set(analysis.playerId, analysis.stats);
      });
      setStats(playersStats);
      console.debug("STATS:", playersStats);
    });

  }, [teams]);

  const renderTitle = () => {
    return (
      <Row justify="center">
        <Title level={3}>Analysis</Title>
      </Row>
    );
  };

  const renderItemMap = (item: IMapEntity) => {

    const mapAvatar = (imageUrl: string) => {
      return (
        <Avatar
          src={imageUrl}
          shape="square"
          icon={<PictureOutlined />}
          size={"large"}
        />
      );
    };

    return (
      <List.Item key={item.game_map_id}>
        <Space direction={"vertical"} size={"large"}>
          <Meta
            avatar={mapAvatar(item.image_lg)}
            title={item.name}
          />
          <MapAnalysisItem />
        </Space>
      </List.Item>
    );
  };

  return (
    <>
      <Card title={renderTitle()} style={{ width: "100%" }}>
        {
          stats != null ?
            (
              <List
                dataSource={voting.map.entities}
                renderItem={item => renderItemMap(item)}
              />
            )
            :
            (
              <Skeleton />
            )
        }
      </Card>
    </>
  );
};

export default AnalysisItem;