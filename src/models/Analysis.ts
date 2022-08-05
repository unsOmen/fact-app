import { IPlayer } from "./Match";
import { ISegment } from "./PlayerStats";

export interface IPlayerAnalysis {
    playerId: string;
    analysis: any;
}

export interface IAvgMapWinRate {
    teamName: string;
    mapSegment: ISegment | null;
    avgWinRate: number;
    maxWinRate: number;
    maxWinRatePlayer: IPlayer | null;
    minWinRate: number;
    minWinRatePlayer: IPlayer | null;
}

export interface IReportAvgMapWinRate {
    team1Report: IAvgMapWinRate;
    team2Report: IAvgMapWinRate;
}