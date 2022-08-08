import { IMatch, IMatchPayload } from "../models/Match";
import { IPlayerDetails, IPlayerStats } from "../models/PlayerStats";

class FaceitService {

  private static clientApiKey: string = "536270d6-13a9-477c-a3ee-9fdc53fbd67c";
  private static csgoGameId: string = "csgo";

  static async getMatch(matchId: string): Promise<IMatch> {
    const headers: Headers = FaceitService.initRqHeader();
    console.debug("GET MATCH", matchId);
    return fetch(`https://open.faceit.com/data/v4/matches/${matchId}`, {
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

  static async getPlayerDetails(playerId: string): Promise<IPlayerDetails> {
    const headers: Headers = FaceitService.initRqHeader();
    console.debug("GET PLAYER DETAILS", playerId);
    return fetch(`https://open.faceit.com/data/v4/players/${playerId}`, {
      method: 'GET',
      headers: headers
    }).then((response) => {
      if (response.ok) {
        return response.json() as Promise<IPlayerDetails>;
      } else {
        throw new Error("Unable to fetch player details. Reason: " + response.status + " " + response.statusText);
      }
    });
  };

  static async getPlayerStats(playerId: string): Promise<IPlayerStats> {
    const headers: Headers = FaceitService.initRqHeader();
    console.debug("GET PLAYER STATS", playerId);
    return fetch(`https://open.faceit.com/data/v4/players/${playerId}/stats/${this.csgoGameId}`, {
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

  static async getMatchPayload(matchId: string): Promise<IMatchPayload> {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const request: any = {
      method: 'GET',
      headers: headers
    };

    console.debug("GET MATCH PAYLOAD", matchId);
    return fetch(`https://api.faceit.com/democracy/v1/match/${matchId}`, request)
      .then((response) => {
        if (response.ok) {
          return response.json() as Promise<IMatchPayload>;
        } else {
          throw new Error("Unable to fetch match payload. Reason: " + response.status + " " + response.statusText);
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