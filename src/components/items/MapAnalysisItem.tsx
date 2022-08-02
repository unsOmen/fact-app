import React, { FC } from "react";
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IAvgMapWinRate, IReportAvgMapWinRate } from "../../models/Analysis";


interface Props {
    map: string;
    reportAvgMapWinRate: IReportAvgMapWinRate;
}

const MapAnalysisItem: FC<Props> = ({ map, reportAvgMapWinRate }) => {

    const dataSource: IAvgMapWinRate[] = [reportAvgMapWinRate.team1Report, reportAvgMapWinRate.team2Report];

    const columns: ColumnsType<IAvgMapWinRate> = [
        {
            title: 'Team',
            dataIndex: 'teamName',
            key: 'teamName',
        },
        {
            title: 'Avg Win Rate',
            dataIndex: 'avgWinRate',
            key: 'avgWinRate',
        },
        {
            title: 'Max Win Rate',
            dataIndex: 'maxWinRate',
            key: 'maxWinRate',
        },
        {
            title: 'Max Win Rate Player',
            dataIndex: 'maxWinRatePlayerName',
            key: 'maxWinRatePlayerName',
        },
        {
            title: 'Min Win Rate',
            dataIndex: 'minWinRate',
            key: 'minWinRate',
        },
        {
            title: 'Min Win Rate Player',
            dataIndex: 'minWinRatePlayerName',
            key: 'minWinRatePlayerName',
        }
    ];

    return (
        <>
            <Table dataSource={dataSource} columns={columns} pagination={false} rowKey={(record) => map + "_" + record.teamName}/>
        </>
    );
};

export default MapAnalysisItem;