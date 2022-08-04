import React, { FC, useState } from "react";
import { IMapEntity, IMatch } from "../../models/Match";
import { Card, Space, Typography, Row, List, Skeleton } from "antd";
import MapAnalysisItem from "./MapAnalysisItem";
import AnalysisService from "../../api/AnalysisService";
import useMatchContext from "../../context/useMatchContext";


const { Title } = Typography;
const { Meta } = Card;

interface Props {
  match: IMatch;
}

const AnalysisItem: FC<Props> = ({ match }) => {
 
  const {stats, setStats, info, setInfo} = useMatchContext();
  const [maps, setMaps] = useState<IMapEntity[]>([]);


  React.useEffect(() => {
    AnalysisService.fetchPlayersStats(match.teams, setStats);
    AnalysisService.fetchPlayersInfo(match.teams, setInfo);
    AnalysisService.fetchMatchMaps(match, setMaps);
  }, [match]);

  const renderTitle = () => {
    return (
      <Row justify="center">
        <Title level={3}>Analysis</Title>
      </Row>
    );
  };

  const renderItemMap = (item: IMapEntity) => {

    let reportAvgMapWinRate = null;
    if (stats) {
      const reportTeam1 = AnalysisService.reportAvgMapWinRate(match.teams.faction1, item.game_map_id, stats);
      const reportTeam2 = AnalysisService.reportAvgMapWinRate(match.teams.faction2, item.game_map_id, stats);
      reportAvgMapWinRate = {
        team1Report: reportTeam1,
        team2Report: reportTeam2,
      };
    }

    return (
      <List.Item key={item.game_map_id}>

        <Space
          direction={"vertical"}
          size={"large"}
          style={{ width: '100%' }}
        >
          <Meta
            className="map-bg"
            title={item.name}
            style={{
              paddingTop: "12px",
              paddingLeft: "12px",
              backgroundImage: `url(${item.image_lg})`
            }}
          />
          {
            (stats && reportAvgMapWinRate) && (
              <MapAnalysisItem map={item.game_map_id} reportAvgMapWinRate={reportAvgMapWinRate} />
            )
          }
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