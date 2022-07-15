import React, { FC } from "react";
import { ITeams } from "../../models/Models";


interface Props {
  teams: ITeams
}

const AnalyticsItem: FC<Props> = ({ teams }) => {

  React.useEffect(() => {
    //TODO fetch each player stats
  }, [teams])

  return (
    <>
    </>
  );
};

export default AnalyticsItem;