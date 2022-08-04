export interface IPlayerDetails {
    player_id: string;
    nickname: string;
    games: IPlayerGames;
}

export interface IPlayerGames {
    csgo: IPlayerInfo;
}

export interface IPlayerInfo {
    region: string;
    game_player_id: string;
    skill_level: number;
    faceit_elo: number;
    game_player_name: string;
}

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
