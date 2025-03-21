'use client';

import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PokemonDetailed } from '../../lib/dto/pokemon-dto';
import { ColorChip } from './color-chip';

interface PokemonDetailDrawerProps {
  pokemon: PokemonDetailed | null;
  onClose: () => void;
  onAddToTeam: () => void;
  open: boolean;
  hideAddToTeamButton?: boolean;
}

export const DRAWER_WIDTH = 350;

export function PokemonDetailDrawer({
  pokemon,
  onClose,
  onAddToTeam,
  open,
  hideAddToTeamButton = false,
}: PokemonDetailDrawerProps) {
  if (!pokemon) return null;

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          position: 'fixed',
          height: '100%',
          top: 0,
          borderLeft: theme => `1px solid ${theme.palette.divider}`,
          boxShadow: theme => `-${theme.spacing(0.5)} 0px ${theme.spacing(1)} rgba(0, 0, 0, 0.05)`,
        },
      }}
    >
      <Box
        sx={{
          padding: 2,
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}
          >
            {pokemon.name}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <img
            src={
              pokemon.sprites.other?.['official-artwork']?.front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
            style={{ width: '80%', maxHeight: 200, objectFit: 'contain' }}
          />
        </Box>

        <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {pokemon.types.map(typeInfo => (
            <ColorChip key={typeInfo.type.name} type={typeInfo.type.name} />
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Base Stats</Typography>
        <List dense>
          {pokemon.stats.map(stat => (
            <ListItem key={stat.stat.name} disablePadding sx={{ py: 0.5 }}>
              <ListItemText
                primary={
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                      {stat.stat.name.replace('-', ' ')}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {stat.base_stat}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Abilities</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1, mb: 2 }}>
          {pokemon.abilities.map(ability => (
            <Chip
              key={ability.ability.name}
              label={
                ability.ability.name.replace('-', ' ') + (ability.is_hidden ? ' (Hidden)' : '')
              }
              size="small"
              sx={{
                textTransform: 'capitalize',
                backgroundColor: ability.is_hidden
                  ? 'rgba(66, 165, 245, 0.1)'
                  : 'rgba(0, 0, 0, 0.08)',
                border: ability.is_hidden ? '1px solid rgba(66, 165, 245, 0.5)' : 'none',
                '& .MuiChip-label': {
                  fontWeight: ability.is_hidden ? 'medium' : 'normal',
                },
              }}
            />
          ))}
        </Box>

        {!hideAddToTeamButton && (
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" fullWidth onClick={onAddToTeam}>
              Add to Team
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
