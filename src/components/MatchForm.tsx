import React, { FC, memo, useState } from "react";
import { Layout } from "antd";
import FaceitService from "../api/FaceitService";
import { IMatch } from "../models/IMatch";


interface Props {
    matchId: string;
}

const MatchForm: FC<Props> = ({ matchId }) => {

    const [matchData, setMatchData] = useState<IMatch>();

    React.useEffect(() => {
        if (matchId) {
            const getMatch = async (id: string) => {
                const match = await FaceitService.getMatch(id);
                if (match) {
                    setMatchData(match);
                }
            };
            getMatch(matchId);
        }
    }, [matchId]);

    return (
        <Layout>
            <p>MATCH: {matchData?.match_id}</p>
            <p>STATUS: {matchData?.status}</p>
        </Layout>
    )
};

export default memo(MatchForm);