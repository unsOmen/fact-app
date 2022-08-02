import React from "react";
import { IAvgMapWinRate, IPlayerAnalysis } from "../models/Analysis";
import { IMapEntity, IMatch, IMatchPayload, ITeam, ITeams } from "../models/Match";
import { IPlayerStats } from "../models/PlayerStats";
import FaceitService from "./FaceitService";

class AnalysisService {

  static fetchPlayersStats(teams: ITeams, dispatch: React.Dispatch<React.SetStateAction<Map<string, IPlayerStats> | null>>) {
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

  static fetchMatchMaps(match: IMatch, dispatch: React.Dispatch<React.SetStateAction<IMapEntity[]>>) {
    if (match.voting && match.voting.map && match.voting.map.entities.length > 0) {
      console.debug("VOTING MAPS:", match.voting.map.entities);
      dispatch(match.voting.map.entities);

    } else {
      FaceitService.getMatchPayload(match.match_id)
        .then((matchPayload: IMatchPayload) => {
          const mapTicket = matchPayload.payload.tickets.find((item) => {
            return item.entity_type.toLocaleLowerCase() === "map";
          });

          if (mapTicket) {
            const maps = mapTicket.entities.map((item) => {
              return item.properties;
            });
            console.debug("PAYLOAD MAPS:", maps);
            dispatch(maps);
          }
        });
    }
  };

  static reportAvgMapWinRate(team: ITeam, map: string, stats: Map<string, IPlayerStats>): IAvgMapWinRate {

    let maxWinRate = -1;
    let maxWinRatePlayerName = '';
    let minWinRate = -1;
    let minWinRatePlayerName = '';

    const mapWinRates = team.roster.map((item) => {
      const playerStats = stats.get(item.player_id);
      if (playerStats) {
        const mapStats = playerStats.segments.find((segment) => {
          return segment.label === map;
        });
        const winRate = mapStats?.stats["Win Rate %"];

        if (winRate) {
          //find max
          const winRateValue = Number.parseInt(winRate);
          if (winRateValue > maxWinRate || maxWinRate < 0) {
            maxWinRate = winRateValue;
            maxWinRatePlayerName = item.nickname;
          }

          //find min
          if (winRateValue < maxWinRate || minWinRate < 0) {
            minWinRate = winRateValue;
            minWinRatePlayerName = item.nickname;
          }
        }
        return winRate;
      }
      return null;
    });

    const winRateSum = mapWinRates.reduce((prevSum, value) => {
      if (value) {
        return prevSum + Number.parseInt(value)
      }
      return prevSum;
    }, 0);
    const avgWinRate = winRateSum / team.roster.length;

    const report: IAvgMapWinRate = {
      teamName: team.name,
      avgWinRate: avgWinRate,
      maxWinRate: maxWinRate,
      maxWinRatePlayerName: maxWinRatePlayerName,
      minWinRate: minWinRate,
      minWinRatePlayerName: minWinRatePlayerName
    };

    return report;
  };
}

export default AnalysisService;