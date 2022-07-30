export interface IPlayerStats {
    player_id: string;
    game_id: string;
    segments: ISegment[];
}

export interface ISegment {
    type: string;
    label: string;
    mode: string;
    img_regular: string;
    stats: IStats;
}

export interface IStats {
    "Matches": string;
    "Win Rate %": string;
}
