import axios from 'axios';
import { PokemonBasic, PokemonDetailed, TypeRelations } from '../dto/pokemon-dto';
import env from '../../environment/env';

const BASE_URL = env.apiBaseUrl;

export const pokeApi = {
  async getPokemonList(
    limit = 20,
    offset = 0
  ): Promise<{ results: { name: string; url: string }[] }> {
    try {
      const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching pokemon list: ${error}`);
      throw error;
    }
  },

  async getPokemonByName(name: string): Promise<PokemonDetailed> {
    try {
      const response = await axios.get(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching pokemon by name '${name}': ${error}`);
      throw error;
    }
  },

  async getPokemonById(id: number): Promise<PokemonDetailed> {
    try {
      const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching pokemon by id '${id}': ${error}`);
      throw error;
    }
  },

  async searchPokemon(query: string): Promise<PokemonBasic[]> {
    try {
      const response = await axios.get(`${BASE_URL}/pokemon?limit=1000`);
      const results = response.data.results;

      const filteredResults = results.filter((pokemon: { name: string }) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );

      const detailedPokemon = await Promise.all(
        filteredResults.slice(0, 10).map(async (pokemon: { name: string }) => {
          return await this.getPokemonByName(pokemon.name);
        })
      );

      return detailedPokemon;
    } catch (error) {
      console.error(`Error searching pokemon with query '${query}': ${error}`);
      throw error;
    }
  },

  async getPokemonByType(types: string[]): Promise<PokemonBasic[]> {
    try {
      if (types.length === 0) return [];

      if (types.length === 1) {
        const response = await axios.get(`${BASE_URL}/type/${types[0].toLowerCase()}`);
        const pokemonList = response.data.pokemon.slice(0, 20);

        const detailedPokemon = await Promise.all(
          pokemonList.map(async (entry: { pokemon: { name: string } }) => {
            return await this.getPokemonByName(entry.pokemon.name);
          })
        );

        return detailedPokemon;
      }

      const typePromises = types.map(type => axios.get(`${BASE_URL}/type/${type.toLowerCase()}`));

      const typeResponses = await Promise.all(typePromises);

      const pokemonByType = typeResponses.map(response =>
        response.data.pokemon.map((entry: { pokemon: { name: string } }) => entry.pokemon.name)
      );

      const commonPokemon = pokemonByType.reduce((common, currentTypeList) =>
        common.filter((name: string) => currentTypeList.includes(name))
      );

      const limitedCommonPokemon = commonPokemon.slice(0, 20);

      const detailedPokemon = await Promise.all(
        limitedCommonPokemon.map(async (name: string) => {
          return await this.getPokemonByName(name);
        })
      );

      return detailedPokemon;
    } catch (error) {
      console.error(`Error fetching pokemon by types '${types.join(', ')}': ${error}`);
      throw error;
    }
  },

  async getTypeRelations(type: string): Promise<TypeRelations> {
    try {
      const response = await axios.get(`${BASE_URL}/type/${type.toLowerCase()}`);
      return response.data.damage_relations;
    } catch (error) {
      console.error(`Error fetching type relations for '${type}': ${error}`);
      throw error;
    }
  },
};
