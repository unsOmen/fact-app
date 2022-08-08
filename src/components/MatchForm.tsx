import React, { FC, memo } from "react";
import { Row, Col, Layout, BackTop } from "antd";
import { AnalysisItem, MatchInfoItem, TeamInfoItem } from "./items";
import useMatchContext from "../context/useMatchContext";
import { IMatch } from "../models/Match";


interface Props {
  matchId: string;
}

const MatchForm: FC<Props> = ({ matchId }) => {

  const { match, setMatch } = useMatchContext();

  React.useEffect(() => {
    if (matchId) {
      const saveMatch = (match: IMatch) => {
        if (match) {
          setMatch(match);
          console.debug("MATCH:", match);
        }
      };

      chrome.runtime.sendMessage({
        contentScriptQuery: "getMatch",
        data: matchId
      }, saveMatch)
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
              }}
              />
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
            <BackTop />
          </Layout>
        )
      }
    </>
  )
};

export default memo(MatchForm);