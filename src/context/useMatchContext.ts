 import React from "react";
 import MatchContext from "./MatchContext";

function useMatchContext() {
    return React.useContext(MatchContext);
}

export default useMatchContext;