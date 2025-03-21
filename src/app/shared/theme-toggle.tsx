'use client';

import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useColorMode } from '../theme/theme-context';

export default function ThemeToggle() {
  const theme = useTheme();
  const { toggleColorMode, mode } = useColorMode();

  return (
    <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
      <IconButton
        onClick={toggleColorMode}
        sx={{ color: theme => theme.palette.pokemon.yellowLight }}
        aria-label="toggle theme"
      >
        {mode === 'dark' ? <BedtimeIcon /> : <Brightness5Icon />}
      </IconButton>
    </Tooltip>
  );
}
