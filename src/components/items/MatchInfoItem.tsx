import React, { FC } from "react";
import { IMatchInfo } from "../../models/Models";
import { Layout, Row, Typography } from "antd";


const { Title } = Typography;

interface Props {
    matchInfo: IMatchInfo;
}

export const MatchInfo: FC<Props> = ({ matchInfo }) => {

    return (
        <Layout>
            <Row justify="center" align="middle">
                <Title level={2}>{matchInfo.name}</Title>
            </Row>
            <Row justify="center" align="middle">
                <Title level={3}>{matchInfo.type}</Title>
            </Row>
        </Layout>
    );
};