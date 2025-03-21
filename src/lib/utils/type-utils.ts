import { useTheme } from '@mui/material/styles';

export function useTypeColor(type: string): string {
  const theme = useTheme();
  const typeColorKey = type as keyof typeof theme.palette.pokemon.types;
  return theme.palette.pokemon.types[typeColorKey] || theme.palette.pokemon.types.unknown;
}
