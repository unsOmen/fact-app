import { IPlayerStats } from "./PlayerStats";

export interface ITeamAnalysis {
    name: string;
    stats: any[];
}

export interface IPlayerAnalysis {
    playerId: string;
    stats: IPlayerStats;
}