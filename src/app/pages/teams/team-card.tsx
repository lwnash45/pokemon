import { CardContent, Box, Typography, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { PokemonDetailed, Team } from '../../../lib/dto/pokemon-dto';
import { PokemonTeamMember } from './pokemon-team-member';
import { EmptyTeamSlot } from './empty-team-slot';
import { AnimatedCard } from '../../shared/animated-card';

interface TeamCardProps {
  team: Team;
  onEditTeam: (team: Team) => void;
  onDeleteTeam: (id: string) => void;
  onRemovePokemon: (teamId: string, pokemonId: number) => void;
  onPokemonClick: (pokemon: PokemonDetailed) => void;
}

export function TeamCard({
  team,
  onEditTeam,
  onDeleteTeam,
  onRemovePokemon,
  onPokemonClick,
}: TeamCardProps) {
  return (
    <AnimatedCard
      cardProps={{
        sx: {
          '&:hover': {
            border: undefined,
          },
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography
            variant="h5"
            sx={{
              background: theme => theme.palette.primary.main,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
            }}
          >
            {team.name}
          </Typography>
          <Box>
            <IconButton onClick={() => onEditTeam(team)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDeleteTeam(team.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {team.pokemon.map(pokemon => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={`${team.id}-${pokemon.id}`}>
              <PokemonTeamMember
                pokemon={pokemon}
                onRemove={() => onRemovePokemon(team.id, pokemon.id)}
                onPokemonClick={() => onPokemonClick(pokemon)}
              />
            </Grid>
          ))}

          {Array.from({ length: 6 - team.pokemon.length }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={`empty-${index}`}>
              <EmptyTeamSlot />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </AnimatedCard>
  );
}
