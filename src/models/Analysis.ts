import { IPlayerStats } from "./PlayerStats";

export interface ITeamAnalysis {
    name: string;
    stats: any[];
}

export interface IPlayerAnalysis {
    playerId: string;
    stats: IPlayerStats;
}

export interface IAvgMapWinRate {
    teamName: string;
    avgWinRate: number;
    maxWinRate: number;
    maxWinRatePlayerName: string;
    minWinRate: number;
    minWinRatePlayerName: string;
}

export interface IReportAvgMapWinRate {
    team1Report: IAvgMapWinRate;
    team2Report: IAvgMapWinRate;
}