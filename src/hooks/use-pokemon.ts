import { useState, useEffect } from 'react';
import { pokeApi } from '../lib/api/poke-api';
import { PokemonBasic } from '../lib/dto/pokemon-dto';

export function usePokemon() {
  const [pokemonList, setPokemonList] = useState<PokemonBasic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadPokemonList = async (page = 0, limit = 20) => {
    try {
      setLoading(true);
      setError(null);

      const data = await pokeApi.getPokemonList(limit, page * limit);

      if (data.results.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const detailedPokemon = await Promise.all(
        data.results.map(async pokemon => {
          return await pokeApi.getPokemonByName(pokemon.name);
        })
      );

      setPokemonList(prev => (page === 0 ? detailedPokemon : [...prev, ...detailedPokemon]));
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load Pokémon data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchPokemon = async (query: string) => {
    if (!query.trim()) {
      loadPokemonList(0);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const results = await pokeApi.searchPokemon(query);

      setPokemonList(results);
      setHasMore(false);
    } catch (err) {
      setError('Failed to search Pokémon');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPokemonByType = async (types: string[]) => {
    try {
      setLoading(true);
      setError(null);

      const results = await pokeApi.getPokemonByType(types);

      setPokemonList(results);
      setHasMore(false);
    } catch (err) {
      setError('Failed to get Pokémon by type');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemonList(0);
  }, []);

  return {
    pokemonList,
    loading,
    error,
    hasMore,
    currentPage,
    loadMore: () => loadPokemonList(currentPage + 1),
    searchPokemon,
    getPokemonByType,
    refresh: () => loadPokemonList(0),
  };
}
