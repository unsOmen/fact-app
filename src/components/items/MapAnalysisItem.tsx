import React, { FC } from "react";
import { Table, Space, Popover, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IAvgMapWinRate, IPlayerAndMapStats, IReportAvgMapWinRate } from "../../models/Analysis";
import useMatchContext from "../../context/useMatchContext";
import { IPlayer } from "../../models/Match";


const { Text, Link } = Typography;

interface Props {
    map: string;
    reportAvgMapWinRate: IReportAvgMapWinRate;
}

const MapAnalysisItem: FC<Props> = ({ map, reportAvgMapWinRate }) => {

    const dataSource: IAvgMapWinRate[] = [reportAvgMapWinRate.team1Report, reportAvgMapWinRate.team2Report];
    const { stats, info } = useMatchContext();

    const renderPlayerPopover = (playerAndMapStats: IPlayerAndMapStats) => {
        const player = playerAndMapStats.player;
        const mapStats = playerAndMapStats.mapStats.stats;
        const popoverContent = () => {
            return (
                <Space size={"small"} direction={"vertical"}>
                    <div>ELO: {info?.get(player.player_id)?.faceit_elo}</div>
                    <div>Matches (on map): {mapStats["Matches"]}</div>
                    <div>Win Rate (on map): {mapStats["Win Rate %"]}</div>
                </Space>
            );
        };

        return (
            <Popover content={popoverContent()} title={player.nickname}>
                <Link>{player.nickname}</Link>
            </Popover>
        );
    };

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
            render: (value, teamReport) => {
                return (
                    <Space>
                        <div>{value}</div>
                        {
                            teamReport.maxWinRatePlayer && (
                                renderPlayerPopover(teamReport.maxWinRatePlayer))
                        }
                    </Space>
                );
            }
        },
        {
            title: 'Min Win Rate',
            dataIndex: 'minWinRate',
            key: 'minWinRate',
            render: (value, teamReport) => {
                return (
                    <Space>
                        <div>{value}</div>
                        {
                            teamReport.minWinRatePlayer && (
                                renderPlayerPopover(teamReport.minWinRatePlayer))
                        }
                    </Space>
                );
            }
        }
    ];

    return (
        <>
            <Table dataSource={dataSource} columns={columns} pagination={false} rowKey={(record) => map + "_" + record.teamName} />
        </>
    );
};

export default MapAnalysisItem;