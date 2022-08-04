import React, { FC, memo, useState } from "react";
import { Row, Col, Layout } from "antd";
import FaceitService from "../api/FaceitService";
import { AnalysisItem, MatchInfoItem, TeamInfoItem } from "./items";
import useMatchContext from "../context/useMatchContext";


interface Props {
  matchId: string;
}

const MatchForm: FC<Props> = ({ matchId }) => {

  const {match, setMatch} = useMatchContext();

  React.useEffect(() => {
    if (matchId) {
      const getMatch = async (id: string) => {
        const match = await FaceitService.getMatch(id);
        if (match) {
          setMatch(match);
          console.log("MATCH:", match);
        }
      };
      getMatch(matchId);
    }
  }, [matchId]);

  return (
    <>
      {
        match && (
          <Layout>
            <Row>
              <MatchInfoItem matchInfo={{
                name: match.competition_name,
                type: match.competition_type,
                result: match.result
              }} />
            </Row>
            <Row>
              <Col span={6} className="team-card-1">
                <Row justify="start">
                  <TeamInfoItem team={match.teams.faction1} />
                </Row>
              </Col>
              <Col span={12}>
                <Row justify="center">
                  <AnalysisItem match={match} />
                </Row>
              </Col>
              <Col span={6} className="team-card-2">
                <Row justify={"end"}>
                  <TeamInfoItem team={match.teams.faction2} />
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