import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { Team } from '../../../lib/dto/pokemon-dto';

interface TeamPreviewProps {
  team: Team;
}

export function TeamPreview({ team }: TeamPreviewProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {team.name}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {team.pokemon.map(pokemon => (
            <Box key={pokemon.id} sx={{ width: 70, textAlign: 'center' }}>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                style={{ width: '100%', height: 'auto' }}
              />
              <Typography variant="caption" display="block" noWrap>
                {pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1)}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
