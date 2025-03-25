import React from 'react';
import { Box } from '@mui/material';
import CircleOutlined from '@mui/icons-material/CircleOutlined';
import { Team } from '../../lib/dto/pokemon-dto';
import Pokeball from '../svgs/pokeball';

interface TeamSelectMenuItemProps {
  team: Team;
}

export function TeamSelectMenuItem({ team }: TeamSelectMenuItemProps) {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
    >
      {team.name}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {Array.from({ length: team.pokemon.length }).map((_, index) => (
          <Pokeball width={24} height={24} key={`filled-${index}`} />
        ))}

        {Array.from({ length: 6 - team.pokemon.length }).map((_, index) => (
          <CircleOutlined
            key={`empty-${index}`}
            fontSize="small"
            sx={{
              fontSize: theme => theme.spacing(2.5),
              mx: 0.3,
              color: 'grey.500',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
