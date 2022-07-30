export interface IMatch {
  match_id: string;
  status: string;
  faceit_url: string;
  competition_name: string;
  competition_type: string;
  result: IResult;
  teams: ITeams;
  voting: IVoting;
}

export interface ITeams {
  faction1: ITeam;
  faction2: ITeam;
}

export interface IResult {
  score: {
    faction1: number;
    faction2: number;
  },
  winner: string;
}

export interface ITeam {
  name: string;
  roster: IPlayer[];
}

export interface IPlayer {
  nickname: string;
  player_id: string;
  avatar: string;
}

export interface IMatchInfo {
  name: string;
  type: string;
  result: IResult;
}

export interface IVoting {
  map: IMap;
}

export interface IMap {
  entities: IMapEntity[];
  pick: string[];
}

export interface IMapEntity {
  name: string;
  game_map_id: string;
  image_lg: string;
}