import { IMatch } from "../models/Match";
import { IPlayerStats } from "../models/PlayerStats";

class FaceitService {

  private static clientApiKey: string = "536270d6-13a9-477c-a3ee-9fdc53fbd67c";
  private static csgoGameId: string = "csgo";

  static async getMatch(matchId: string): Promise<IMatch> {
    const headers: Headers = FaceitService.initRqHeader();
    return fetch(`/data/v4/matches/${matchId}`, {
      method: 'GET',
      headers: headers
    }).then((response) => {
      if (response.ok) {
        return response.json() as Promise<IMatch>;
      } else {
        throw new Error("Unable to fetch match. Reason: " + response.status + " " + response.statusText);
      }
    });
  };

  static async getPlayerStats(playerId: string): Promise<IPlayerStats> {
    const headers: Headers = FaceitService.initRqHeader();
    return fetch(`/data/v4/players/${playerId}/stats/${this.csgoGameId}`, {
      method: 'GET',
      headers: headers
    }).then((response) => {
      if (response.ok) {
        return response.json() as Promise<IPlayerStats>;
      } else {
        throw new Error("Unable to fetch player stats. Reason: " + response.status + " " + response.statusText);
      }
    });
  };

  private static initRqHeader(): Headers {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.clientApiKey}`);
    return headers;
  };
}

export default FaceitService;