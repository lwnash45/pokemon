import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    pokemon: {
      yellow: string;
      yellowLight: string;
      emptySlotBg: string;
      emptySlotBorder: string;
      types: {
        normal: string;
        fire: string;
        water: string;
        electric: string;
        grass: string;
        ice: string;
        fighting: string;
        poison: string;
        ground: string;
        flying: string;
        psychic: string;
        bug: string;
        rock: string;
        ghost: string;
        dragon: string;
        dark: string;
        steel: string;
        fairy: string;
        unknown: string;
      };
    };
  }

  interface PaletteOptions {
    pokemon?: {
      yellow?: string;
      yellowLight?: string;
      emptySlotBg?: string;
      emptySlotBorder?: string;
      types?: {
        normal?: string;
        fire?: string;
        water?: string;
        electric?: string;
        grass?: string;
        ice?: string;
        fighting?: string;
        poison?: string;
        ground?: string;
        flying?: string;
        psychic?: string;
        bug?: string;
        rock?: string;
        ghost?: string;
        dragon?: string;
        dark?: string;
        steel?: string;
        fairy?: string;
        unknown?: string;
      };
    };
  }
}
