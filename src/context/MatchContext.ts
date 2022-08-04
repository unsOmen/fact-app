import { createContext } from "react";
import { IMatch } from "../models/Match";
import { IPlayerInfo, IPlayerStats } from "../models/PlayerStats";

export interface MatchContextType {
  match: IMatch | null;
  setMatch: (match: IMatch | null) => void;

  info: Map<string, IPlayerInfo> | null;
  setInfo: (info: Map<string, IPlayerInfo> | null) => void;

  stats: Map<string, IPlayerStats> | null;
  setStats: (stats: Map<string, IPlayerStats> | null) => void;
}

const MatchContext = createContext<MatchContextType>(null!);

export default MatchContext;
