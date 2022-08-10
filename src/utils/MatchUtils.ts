const faceitCsgoRoomPath = "https://www.faceit.com/en/csgo/room/";

export const isFaceitMatchRoom = (matchId: string) => {
  return matchId.startsWith(faceitCsgoRoomPath);
};

export const getMatchId = (matchId: string) => {
  if (isFaceitMatchRoom(matchId)) {
    return matchId.replace(faceitCsgoRoomPath, "");
  }
  return matchId;
};