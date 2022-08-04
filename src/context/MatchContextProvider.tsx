import React, { ReactNode, useState } from "react";
import { IMatch } from "../models/Match";
import { IPlayerInfo, IPlayerStats } from "../models/PlayerStats";
import MatchContext, { MatchContextType } from "./MatchContext";

function MatchContextProvider({ children }: { children: ReactNode }): JSX.Element {

    const [matchData, setMatchData] = useState<IMatch | null>(null);
    const [stats, setStats] = useState<Map<string, IPlayerStats> | null>(null);
    const [info, setInfo] = useState<Map<string, IPlayerInfo> | null>(null);

    const handleSetMatch = (match: IMatch | null) => {
        setMatchData(match);
    };

    const handleSetInfo = (info: Map<string, IPlayerInfo> | null) => {
        setInfo(info);
    };

    const handleSetStats = (stats: Map<string, IPlayerStats> | null) => {
        setStats(stats);
    };

    const getMatchContextProviderValue = (): MatchContextType => {
        return {
            match: matchData,
            setMatch: handleSetMatch,
            info: info,
            setInfo: handleSetInfo,
            stats: stats,
            setStats: handleSetStats
        };
    };

    return (
        <MatchContext.Provider value={getMatchContextProviderValue()}>
            {children}
        </MatchContext.Provider>
    );
};

export default MatchContextProvider;