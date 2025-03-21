import { Card, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PokemonDetailed } from '../../../lib/dto/pokemon-dto';
import { useTypeColor } from '../../../lib/utils/type-utils';
import { useState } from 'react';
import { HoverIconButton } from '../../shared/hover-icon-button';
import { SnackbarAlert, SnackbarSeverity } from '../../shared/snackbar-alert';

interface PokemonTeamMemberProps {
  pokemon: PokemonDetailed;
  onRemove: () => void;
  onPokemonClick: (pokemon: PokemonDetailed) => void;
}

export function PokemonTeamMember({ pokemon, onRemove, onPokemonClick }: PokemonTeamMemberProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSuccess(true);
    onRemove();

    setTimeout(() => {
      setShowSuccess(false);
    }, 1500);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        '&:hover': {
          border: theme => `1px solid ${theme.palette.primary.main}`,
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPokemonClick(pokemon)}
    >
      <HoverIconButton
        icon={
          showSuccess ? (
            <CheckCircleIcon fontSize="small" color="success" />
          ) : (
            <DeleteIcon fontSize="small" color="error" />
          )
        }
        tooltipTitle={showSuccess ? 'Removed' : 'Remove from team'}
        onClick={handleRemove}
        position={{ top: '8px', right: '8px' }}
        isVisible={isHovered || showSuccess}
      />

      <CardMedia
        component="img"
        height="140"
        image={
          pokemon.sprites.other?.['official-artwork']?.front_default ||
          pokemon.sprites.front_default
        }
        alt={pokemon.name}
        sx={{ objectFit: 'contain', bgcolor: theme => theme.palette.pokemon.emptySlotBg }}
      />
      <CardContent
        sx={{ flexGrow: 1, borderTop: theme => `1px solid ${theme.palette.divider}`, padding: 2 }}
      >
        <Typography variant="h6" component="div" sx={{ fontSize: '1rem' }}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', my: 1 }}>
          {pokemon.types.map(typeInfo => (
            <ColorChip key={typeInfo.type.name} type={typeInfo.type.name} />
          ))}
        </Box>
      </CardContent>
      <SnackbarAlert
        open={showSuccess}
        message="Pokemon removed from team"
        severity={SnackbarSeverity.SUCCESS}
        onClose={() => setShowSuccess(false)}
      />
    </Card>
  );
}

const ColorChip = ({ type }: { type: string }) => {
  const color = useTypeColor(type);
  return <Chip label={type} sx={{ bgcolor: color, color: 'white' }} />;
};
