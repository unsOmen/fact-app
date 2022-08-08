import { IPlayer } from "./Match";
import { ISegment } from "./PlayerStats";

export interface IPlayerAnalysis {
    playerId: string;
    analysis: any;
}

export interface IPlayerAndMapStats {
    player: IPlayer;
    mapStats: ISegment;
}

export interface IAvgMapWinRate {
    teamName: string;
    avgWinRate: number;
    maxWinRate: number;
    maxWinRatePlayer: IPlayerAndMapStats | null;
    minWinRate: number;
    minWinRatePlayer: IPlayerAndMapStats | null;
}

export interface IReportAvgMapWinRate {
    team1Report: IAvgMapWinRate;
    team2Report: IAvgMapWinRate;
}