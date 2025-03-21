'use client';

import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { red, blue, grey } from '@mui/material/colors';
import './theme-types';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#EF5350', // Pokemon red
            light: red[300],
            dark: red[700],
            contrastText: '#fff',
          },
          secondary: {
            main: '#42A5F5', // Pokemon blue
            light: blue[300],
            dark: blue[700],
            contrastText: '#fff',
          },
          error: {
            main: red.A400,
          },
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
          text: {
            primary: grey[900],
            secondary: grey[700],
          },
          // Pokemon custom colors
          pokemon: {
            yellow: '#FFDE00', // Bright Pokémon yellow color
            yellowLight: '#FFCB05', // Light Pokémon yellow color used in theme toggle
            emptySlotBg: '#f5f5f5', // Background for empty slots
            emptySlotBorder: '#ccc', // Border color for empty slots
            // Pokemon type colors
            types: {
              normal: '#A8A77A',
              fire: '#EE8130',
              water: '#6390F0',
              electric: '#F7D02C',
              grass: '#7AC74C',
              ice: '#96D9D6',
              fighting: '#C22E28',
              poison: '#A33EA1',
              ground: '#E2BF65',
              flying: '#A98FF3',
              psychic: '#F95587',
              bug: '#A6B91A',
              rock: '#B6A136',
              ghost: '#735797',
              dragon: '#6F35FC',
              dark: '#705746',
              steel: '#B7B7CE',
              fairy: '#D685AD',
              unknown: '#777777',
            },
          },
        }
      : {
          primary: {
            main: '#EF5350', // Pokemon red
            light: red[300],
            dark: red[700],
            contrastText: '#fff',
          },
          secondary: {
            main: '#42A5F5', // Pokemon blue
            light: blue[300],
            dark: blue[700],
            contrastText: '#fff',
          },
          error: {
            main: red.A400,
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: grey[400],
          },
          // Pokemon custom colors
          pokemon: {
            yellow: '#FFDE00', // Bright Pokémon yellow color
            yellowLight: '#FFCB05', // Light Pokémon yellow color used in theme toggle
            emptySlotBg: '#2a2a2a', // Background for empty slots - darker in dark mode
            emptySlotBorder: '#444', // Border color for empty slots - darker in dark mode
            // Pokemon type colors (same in both themes)
            types: {
              normal: '#A8A77A',
              fire: '#EE8130',
              water: '#6390F0',
              electric: '#F7D02C',
              grass: '#7AC74C',
              ice: '#96D9D6',
              fighting: '#C22E28',
              poison: '#A33EA1',
              ground: '#E2BF65',
              flying: '#A98FF3',
              psychic: '#F95587',
              bug: '#A6B91A',
              rock: '#B6A136',
              ghost: '#735797',
              dragon: '#6F35FC',
              dark: '#705746',
              steel: '#B7B7CE',
              fairy: '#D685AD',
              unknown: '#777777',
            },
          },
        }),
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none' as const,
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '8px 12px',
        },
        text: {
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: 'rgba(239, 83, 80, 0.15)',
            transition: 'background-color 0.3s ease',
          },
        },
        containedPrimary: {
          '&:hover': {
            boxShadow: '0 6px 10px rgba(239, 83, 80, 0.3)',
          },
        },
        containedSecondary: {
          '&:hover': {
            boxShadow: '0 6px 10px rgba(66, 165, 245, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

type ColorModeContextType = {
  toggleColorMode: () => void;
  mode: PaletteMode;
};

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: 'light',
});

export const useColorMode = () => useContext(ColorModeContext);

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>('light');

  useEffect(() => {
    const storedMode = localStorage.getItem('themeMode');
    if (storedMode && (storedMode === 'light' || storedMode === 'dark')) {
      setMode(storedMode);
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', newMode);
          return newMode;
        });
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
