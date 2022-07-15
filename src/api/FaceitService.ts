import { IMatch } from "../models/Models";

class FaceitService {

  private static clientApiKey: string = "SOME_CLIENT_API_KEY";

  static async getMatch(matchId: string) {
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

  private static initRqHeader(): Headers {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //TODO add Authorization with clientApiKey
    return headers;
  }
}

export default FaceitService;