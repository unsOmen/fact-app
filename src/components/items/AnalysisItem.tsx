import React, { FC, useState } from "react";
import { IMapEntity, IMatch, ITeams, IVoting } from "../../models/Match";
import { Card, Avatar, Space, Typography, Row, List, Skeleton } from "antd";
import { PictureOutlined } from '@ant-design/icons';
import MapAnalysisItem from "./MapAnalysisItem";
import AnalysisHandler from "../../api/AnalysisHandler";
import { IPlayerStats } from "../../models/PlayerStats";


const { Title } = Typography;
const { Meta } = Card;

interface Props {
  match: IMatch;
}

const AnalysisItem: FC<Props> = ({ match }) => {

  const analysisService = new AnalysisHandler();
  const [stats, setStats] = useState<Map<string, IPlayerStats> | null>(null);
  const [maps, setMaps] = useState<IMapEntity[]>([]);


  React.useEffect(() => {
    analysisService.fetchPlayersStats(match.teams, setStats);
    console.debug("STATS:", stats);

    analysisService.fetchMatchMaps(match, setMaps);
    console.debug("MAPS:", maps);
  }, [match]);

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
          (stats != null && stats.size > 0) ?
            (
              <List
                dataSource={maps}
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