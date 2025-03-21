/**
 * Enum representing all Pokémon types
 */
export enum PokemonType {
  NORMAL = 'normal',
  FIGHTING = 'fighting',
  FLYING = 'flying',
  POISON = 'poison',
  GROUND = 'ground',
  ROCK = 'rock',
  BUG = 'bug',
  GHOST = 'ghost',
  STEEL = 'steel',
  FIRE = 'fire',
  WATER = 'water',
  GRASS = 'grass',
  ELECTRIC = 'electric',
  PSYCHIC = 'psychic',
  ICE = 'ice',
  DRAGON = 'dragon',
  DARK = 'dark',
  FAIRY = 'fairy',
}

/**
 * Array of all Pokémon types for iteration purposes
 */
export const ALL_POKEMON_TYPES: PokemonType[] = Object.values(PokemonType);

/**
 * Helper function to check if a string is a valid Pokémon type
 */
export function isPokemonType(type: string): type is PokemonType {
  return Object.values(PokemonType).includes(type as PokemonType);
}
