import React, { memo } from "react";
import { useParams } from "react-router-dom";


const MatchPage = () => {

  const { matchId } = useParams();

  return (
    <>
      MATCH PAGE: {matchId}
    </>
  )
};

export default MatchPage;