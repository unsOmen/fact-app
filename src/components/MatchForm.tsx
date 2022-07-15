import React, { FC, memo, useState } from "react";
import { Row, Col, Layout } from "antd";
import FaceitService from "../api/FaceitService";
import { IMatch } from "../models/Models";
import { AnalyticsItem, MatchInfoItem, TeamInfoItem } from "./items";


interface Props {
  matchId: string;
}

const MatchForm: FC<Props> = ({ matchId }) => {

  const [matchData, setMatchData] = useState<IMatch>();

  React.useEffect(() => {
    if (matchId) {
      const getMatch = async (id: string) => {
        const match = await FaceitService.getMatch(id);
        if (match) {
          setMatchData(match);
          console.log("MATCH:", match);
        }
      };
      getMatch(matchId);
    }
  }, [matchId]);

  return (
    <>
      {
        matchData && (
          <Layout>
            <Row>
              <MatchInfoItem matchInfo={{
                name: matchData.competition_name,
                type: matchData.competition_type,
                result: matchData.result
              }} />
            </Row>
            <Row>
              <Col span={6}>
                <Row justify="start">
                  <TeamInfoItem team={matchData.teams.faction1} />
                </Row>
              </Col>
              <Col span={12}>
                <Row justify="center">
                  <AnalyticsItem teams={matchData.teams} />
                </Row>
              </Col>
              <Col span={6}>
                <Row justify={"end"}>
                  <TeamInfoItem team={matchData.teams.faction2} />
                </Row>
              </Col>
            </Row>
          </Layout>
        )
      }
    </>
  )
};

export default memo(MatchForm);