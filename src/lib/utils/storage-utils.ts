import { Team } from '../dto/pokemon-dto';

export const storageUtils = {
  saveTeam(team: Team): void {
    if (typeof window !== 'undefined') {
      const teamsMap = this.getTeamsMap();
      const now = new Date().toISOString();

      const existingTeam = teamsMap[team.id];

      teamsMap[team.id] = {
        ...team,
        updatedAt: now,
        createdAt: existingTeam?.createdAt || now,
      };

      sessionStorage.setItem('pokemonTeamsMap', JSON.stringify(teamsMap));
    }
  },

  getTeamsMap(): Record<string, Team> {
    if (typeof window !== 'undefined') {
      const teamsMapJson = sessionStorage.getItem('pokemonTeamsMap');

      if (teamsMapJson) {
        return JSON.parse(teamsMapJson);
      }

      const oldTeamsJson = sessionStorage.getItem('pokemonTeams');
      if (oldTeamsJson) {
        const oldTeams: Team[] = JSON.parse(oldTeamsJson);
        const teamsMap: Record<string, Team> = {};

        oldTeams.forEach(team => {
          teamsMap[team.id] = team;
        });

        sessionStorage.setItem('pokemonTeamsMap', JSON.stringify(teamsMap));
        sessionStorage.removeItem('pokemonTeams');

        return teamsMap;
      }

      return {};
    }
    return {};
  },

  getTeams(): Team[] {
    const teamsMap = this.getTeamsMap();
    return Object.values(teamsMap).sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  },

  getTeamById(id: string): Team | undefined {
    const teamsMap = this.getTeamsMap();
    return teamsMap[id];
  },

  deleteTeam(id: string): void {
    if (typeof window !== 'undefined') {
      const teamsMap = this.getTeamsMap();

      if (teamsMap[id]) {
        const { [id]: deletedTeam, ...remainingTeams } = teamsMap;
        sessionStorage.setItem('pokemonTeamsMap', JSON.stringify(remainingTeams));
      }
    }
  },
};
