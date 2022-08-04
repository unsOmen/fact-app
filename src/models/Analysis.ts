export interface IPlayerAnalysis {
    playerId: string;
    analysis: any;
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