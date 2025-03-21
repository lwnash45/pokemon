'use client';

import React, { useState } from 'react';
import {
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Checkbox,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FolderIcon from '@mui/icons-material/Folder';
import { PokemonDetailed } from '../../../lib/dto/pokemon-dto';
import { useTypeColor } from '../../../lib/utils/type-utils';
import { AnimatedCard } from '../../shared/animated-card';
import { HoverIconButton } from '../../shared/hover-icon-button';

interface PokemonCardProps {
  pokemon: PokemonDetailed;
  onClick: (pokemon: PokemonDetailed) => void;
  onFilterByTypes?: (types: string[]) => void;
  onAddToTeam?: (pokemon: PokemonDetailed) => void;
  selectable?: boolean;
  onSelectChange?: (pokemon: PokemonDetailed, selected: boolean) => void;
}

export function PokemonCard({
  pokemon,
  onClick,
  onFilterByTypes,
  onAddToTeam,
  selectable = false,
  onSelectChange,
}: PokemonCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleFilterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFilterByTypes) {
      const pokemonTypes = pokemon.types.map(t => t.type.name);
      onFilterByTypes(pokemonTypes);
    }
  };

  const handleAddToTeamClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToTeam) {
      onAddToTeam(pokemon);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const selected = e.target.checked;
    setIsSelected(selected);
    if (onSelectChange) {
      onSelectChange(pokemon, selected);
    }
  };

  return (
    <AnimatedCard
      contentPadding={false}
      cardProps={{
        onClick: () => onClick(pokemon),
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        sx: {
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: theme => `translateY(-${theme.spacing(0.5)})`,
            boxShadow: 3,
            border: theme => `1px solid ${theme.palette.primary.main}`,
          },
          overflow: 'hidden',
          padding: 0,
          '& .MuiCardContent-root': {
            padding: 0,
          },
        },
      }}
    >
      <>
        {selectable && (
          <Checkbox
            checked={isSelected}
            onChange={handleCheckboxChange}
            onClick={e => e.stopPropagation()}
            sx={{
              position: 'absolute',
              top: theme => theme.spacing(1),
              left: theme => theme.spacing(1),
              zIndex: 2,
              color: theme => theme.palette.primary.main,
              '&.Mui-checked': {
                color: theme => theme.palette.primary.main,
              },
            }}
          />
        )}

        <HoverIconButton
          icon={<FilterAltIcon color="primary" />}
          tooltipTitle="Similar search"
          onClick={handleFilterClick}
          position={{ top: '8px', right: '8px' }}
          isVisible={isHovered}
        />

        <HoverIconButton
          icon={<FolderIcon color="primary" />}
          tooltipTitle="Add to team"
          onClick={handleAddToTeamClick}
          position={{ bottom: '8px', right: '8px' }}
          isVisible={isHovered}
        />

        <CardMedia
          component="img"
          height="200"
          image={
            pokemon.sprites.other?.['official-artwork']?.front_default ||
            pokemon.sprites.front_default
          }
          alt={pokemon.name}
          sx={{ objectFit: 'contain', bgcolor: theme => theme.palette.pokemon.emptySlotBg }}
        />
        <CardContent>
          <Box
            px={2}
            sx={{
              paddingTop: theme => theme.spacing(1),
              paddingBottom: theme => theme.spacing(2),
              borderTop: theme => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h6" component="div" gutterBottom>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {pokemon.types.map(typeInfo => (
                <ColorChip key={typeInfo.type.name} type={typeInfo.type.name} />
              ))}
            </Box>
          </Box>
        </CardContent>
      </>
    </AnimatedCard>
  );
}

const ColorChip = ({ type }: { type: string }) => {
  const color = useTypeColor(type);
  return <Chip label={type} sx={{ bgcolor: color, color: 'white' }} />;
};
