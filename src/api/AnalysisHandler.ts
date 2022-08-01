import React from "react";
import { IPlayerAnalysis } from "../models/Analysis";
import { IMapEntity, IMatch, ITeams } from "../models/Match";
import { IPlayerStats } from "../models/PlayerStats";
import FaceitService from "./FaceitService";

class AnalysisHandler {

  constructor() {
  }

  fetchPlayersStats(teams: ITeams, dispatch: React.Dispatch<React.SetStateAction<Map<string, IPlayerStats> | null>>) {
    const stats = new Map<string, IPlayerStats>;
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
        stats.set(analysis.playerId, analysis.stats);
      });
      dispatch(stats);
    });
  };

  fetchMatchMaps(match: IMatch, dispatch: React.Dispatch<React.SetStateAction<IMapEntity[]>>) {
    if (match.voting && match.voting.map && match.voting.map.entities.length > 0) {
      dispatch(match.voting.map.entities);
    } else {

      const request: any = {
        method: 'GET',
        headers: AnalysisHandler.initRqHeader()
      };

      fetch(`/democracy/v1/match/${match.match_id}`, request)
      .then(res => res.json() as Promise<any>)
      .then((matchPayload) => {
        console.log("RS TEXT: ", matchPayload);
        //TODO get match maps
      });
    }


  };

  private static initRqHeader(): Headers {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  };
}

export default AnalysisHandler;