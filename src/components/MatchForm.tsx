import React, { FC, memo } from "react";
import { Layout } from "antd";


interface Props {
    matchId: string;
}

const MatchForm: FC<Props> = ({ matchId }) => {
    return (
        <Layout>
            MATCH: {matchId}
        </Layout>
    )
};

export default memo(MatchForm);