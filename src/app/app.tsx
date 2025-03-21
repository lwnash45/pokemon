'use client';

import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
  BrowserRouter,
  Routes,
  Route,
  Link as RouterLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import HomePage from './pages/home/home-page';
import TeamsPage from './pages/teams/teams-page';
import ComparePage from './pages/compare/compare-page';
import ThemeToggle from './shared/theme-toggle';

function useRouteMatch(patterns: string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i++) {
    if (pathname === patterns[i]) {
      return i;
    }
  }

  return 0;
}

function Navigation() {
  const routeMatch = useRouteMatch(['/', '/teams', '/compare']);
  const [value, setValue] = useState(routeMatch);
  const navigate = useNavigate();

  useEffect(() => {
    setValue(routeMatch);
  }, [routeMatch]);

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
      const routes = ['/', '/teams', '/compare'];
      navigate(routes[newValue]);
    },
    [navigate]
  );

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      textColor="inherit"
      indicatorColor="secondary"
      orientation="vertical"
      sx={{
        '& .MuiTabs-indicator': {
          display: 'none',
        },
        '& .MuiTab-root': {
          minWidth: 100,
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.9rem',
          borderRadius: 0,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          color: theme => theme.palette.pokemon.yellow,
        },
        '& .MuiTab-root.Mui-selected': {
          borderRight: theme => `3px solid ${theme.palette.pokemon.yellow}`,
        },
      }}
    >
      <Tab label="Home" />
      <Tab label="Teams" />
      <Tab label="Compare" />
    </Tabs>
  );
}

// Create a wrapper component that provides navigation
function HomePageWithNavigation() {
  const navigate = useNavigate();
  return <HomePage navigateToTeams={() => navigate('/teams')} />;
}

export default function App() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', position: 'relative' }}>
        <AppBar
          position="fixed"
          sx={{
            width: 'fit-content',
            height: '100%',
            flexShrink: 0,
            zIndex: 1200,
            left: 0,
            right: 'auto',
          }}
        >
          <Toolbar
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              '&.MuiToolbar-root': {
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 2,
              },
              color: theme => theme.palette.pokemon.yellow,
            }}
          >
            <Typography variant="h6" component="div" sx={{ my: 2 }}>
              <Box
                component="img"
                src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
                alt="Pokémon"
                sx={{
                  height: theme => theme.spacing(3.75),
                  width: 'auto',
                  display: 'block',
                }}
              />
            </Typography>

            <Navigation />

            <Box sx={{ flexGrow: 1 }} />
            <ThemeToggle />
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: theme => theme.spacing(12.5),
            position: 'relative',
            zIndex: 1,
            width: theme => `calc(100% - ${theme.spacing(12.5)})`,
          }}
        >
          <Routes>
            <Route path="/" element={<HomePageWithNavigation />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}
