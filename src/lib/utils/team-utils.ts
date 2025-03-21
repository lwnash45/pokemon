import { PokemonDetailed, Team, TeamStats } from '../dto/pokemon-dto';
import { pokeApi } from '../api/poke-api';

export const teamUtils = {
  createNewTeam(name: string, pokemon?: PokemonDetailed[]): Team {
    const now = new Date().toISOString();
    return {
      id: Date.now().toString(),
      name,
      pokemon: pokemon || [],
      createdAt: now,
      updatedAt: now,
    };
  },

  canAddPokemon(team: Team): boolean {
    return team.pokemon.length < 6;
  },

  addPokemonToTeam(team: Team, pokemon: PokemonDetailed): Team {
    if (!this.canAddPokemon(team)) {
      throw new Error('Team already has maximum of 6 Pokémon');
    }

    return {
      ...team,
      pokemon: [...team.pokemon, pokemon],
    };
  },

  removePokemonFromTeam(team: Team, pokemonId: number): Team {
    return {
      ...team,
      pokemon: team.pokemon.filter(p => p.id !== pokemonId),
    };
  },

  async calculateTeamStats(team: Team): Promise<TeamStats> {
    const stats: TeamStats = {
      attack: 0,
      defense: 0,
      hp: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
      weaknesses: {},
      resistances: {},
    };

    team.pokemon.forEach(pokemon => {
      pokemon.stats.forEach(stat => {
        switch (stat.stat.name) {
          case 'hp':
            stats.hp += stat.base_stat;
            break;
          case 'attack':
            stats.attack += stat.base_stat;
            break;
          case 'defense':
            stats.defense += stat.base_stat;
            break;
          case 'special-attack':
            stats.specialAttack += stat.base_stat;
            break;
          case 'special-defense':
            stats.specialDefense += stat.base_stat;
            break;
          case 'speed':
            stats.speed += stat.base_stat;
            break;
        }
      });
    });

    for (const pokemon of team.pokemon) {
      for (const typeInfo of pokemon.types) {
        const typeRelations = await pokeApi.getTypeRelations(typeInfo.type.name);

        typeRelations.double_damage_from.forEach(type => {
          stats.weaknesses[type.name] = (stats.weaknesses[type.name] || 0) + 1;
        });

        typeRelations.half_damage_from.forEach(type => {
          stats.resistances[type.name] = (stats.resistances[type.name] || 0) + 1;
        });

        typeRelations.no_damage_from.forEach(type => {
          stats.resistances[type.name] = (stats.resistances[type.name] || 0) + 2;
        });
      }
    }

    return stats;
  },
};
