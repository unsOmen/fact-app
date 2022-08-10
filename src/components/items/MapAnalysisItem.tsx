import React, { FC } from "react";
import { Table, Space, Popover, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IAvgMapWinRate, IPlayerAndMapStats, IReportAvgMapWinRate } from "../../models/Analysis";
import useMatchContext from "../../context/useMatchContext";
import { ITeam } from "../../models/Match";
import { TeamStatsTable } from "../TeamStatsTable";


const { Link } = Typography;

interface Props {
    map: string;
    reportAvgMapWinRate: IReportAvgMapWinRate;
}

const MapAnalysisItem: FC<Props> = ({ map, reportAvgMapWinRate }) => {

    const dataSource: IAvgMapWinRate[] = [reportAvgMapWinRate.team1Report, reportAvgMapWinRate.team2Report];
    const { info } = useMatchContext();

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
            dataIndex: 'team',
            key: 'teamName',
            render: (value: ITeam) => value.name
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
            <Table
                className="table-wrapper"
                scroll={{ x: "scroll" }}
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                expandable={{
                    expandedRowRender: (row: IAvgMapWinRate) => {
                        return (<TeamStatsTable team={row.team} mapId={map} />)
                    }
                }}
                rowKey={(record) => map + "_" + record.team.name}
            />
        </>
    );
};

export default MapAnalysisItem;