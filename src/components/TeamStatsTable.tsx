import React, { FC } from "react";
import { Table, TableColumnsType } from "antd";
import useMatchContext from "../context/useMatchContext";
import { ITeam } from "../models/Match";
import { ColumnType } from "antd/lib/table";


interface Props {
  team: ITeam;
  mapId: string;
}

interface TableProps {
  columns: TableColumnsType<any>;
  data: any[];
}

export const TeamStatsTable: FC<Props> = ({ team, mapId }) => {

  const { stats } = useMatchContext();

  const getTableProps = (): TableProps => {

    const data: any[] = [];
    team.roster.forEach((player) => {
      const playerStats = stats?.get(player.player_id);
      if (playerStats) {
        const mapStats = playerStats.segments.find(segment => {
          return segment.label === mapId;
        });
        if (mapStats) {
          data.push({
            nickname: player.nickname,
            ...mapStats.stats
          });
        }
      }
    });
    console.debug(`Table '${mapId}' data`, data);

    const columns: TableColumnsType<any> = Object.keys(data[0]).map(field => {
      const recordType: ColumnType<any> = {
        title: field, dataIndex: field, key: field
      };
      return recordType;
    });
    console.debug(`Table '${mapId}' columns`, columns);

    return {
      columns: columns,
      data: data
    };
  };

  const tableProps: TableProps = getTableProps();

  return (
    <Table
      columns={tableProps.columns}
      dataSource={tableProps.data}
      rowKey={(record) => team.name + "_" + mapId + "_" + record.nickname}
      scroll={{ x: 'max-content' }}
      pagination={false} />
  );
};