import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Alert,
  CircularProgress,
  Button,
  LinearProgress,
} from '@mui/material';

import { PokemonCard } from './pokemon-card';
import { PokemonSearchForm } from './pokemon-search-form';
import { DRAWER_WIDTH, PokemonDetailDrawer } from '../../shared/pokemon-detail-drawer';
import { usePokemon } from '../../../hooks/use-pokemon';
import { PokemonDetailed } from '../../../lib/dto/pokemon-dto';
import { storageUtils } from '../../../lib/utils/storage-utils';
import { teamUtils } from '../../../lib/utils/team-utils';
import { TeamDialog } from '../../shared/team-dialog';
import { AddToTeamDialog } from './add-to-team';
import { SnackbarAlert, SnackbarSeverity } from '../../shared/snackbar-alert';

export default function HomePage({ navigateToTeams }: { navigateToTeams?: () => void }) {
  const { pokemonList, loading, error, hasMore, loadMore, searchPokemon, getPokemonByType } =
    usePokemon();
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetailed | null>(null);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [addToTeamDialogOpen, setAddToTeamDialogOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [createTeamDialogOpen, setCreateTeamDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>(
    SnackbarSeverity.SUCCESS
  );
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedPokemonList, setSelectedPokemonList] = useState<PokemonDetailed[]>([]);

  const mainContentWidth = useMemo(
    () => (detailDrawerOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%'),
    [detailDrawerOpen]
  );

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPokemonElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore) {
            loadMore();
          }
        },
        {
          root: null,
          rootMargin: '100px',
          threshold: 0.1,
        }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  const showSnackbar = useCallback(
    (message: string, severity: SnackbarSeverity = SnackbarSeverity.SUCCESS) => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
    },
    []
  );

  const handleSearch = useCallback(
    (query: string) => {
      searchPokemon(query);
    },
    [searchPokemon]
  );

  const handleTypeFilter = useCallback(
    (types: string[]) => {
      if (types.length > 0) {
        getPokemonByType(types);
      } else {
        searchPokemon('');
      }
    },
    [getPokemonByType, searchPokemon]
  );

  const handlePokemonClick = useCallback((pokemon: PokemonDetailed) => {
    setSelectedPokemon(pokemon);
    setDetailDrawerOpen(true);
  }, []);

  const handleAddToTeam = useCallback(() => {
    if (selectedPokemon) {
      setAddToTeamDialogOpen(true);
    }
  }, [selectedPokemon]);

  const handleCreateNewTeam = useCallback(() => {
    setCreateTeamDialogOpen(true);
  }, []);

  const handleDirectAddToTeam = useCallback((pokemon: PokemonDetailed) => {
    setSelectedPokemon(pokemon);
    setAddToTeamDialogOpen(true);
  }, []);

  const handlePokemonSelectChange = useCallback((pokemon: PokemonDetailed, selected: boolean) => {
    setSelectedPokemonList(prev => {
      if (selected) {
        return [...prev, pokemon];
      } else {
        return prev.filter(p => p.id !== pokemon.id);
      }
    });
  }, []);

  const handleClickCreateTeamButton = useCallback(() => {
    if (selectedPokemonList.length === 0) {
      showSnackbar('Please select at least one Pokémon', SnackbarSeverity.WARNING);
      return;
    }

    if (selectedPokemonList.length > 6) {
      showSnackbar('A team can have at most 6 Pokémon', SnackbarSeverity.ERROR);
      return;
    }

    setCreateTeamDialogOpen(true);
  }, [selectedPokemonList, showSnackbar]);

  const handleTeamNameChange = useCallback((name: string) => {
    setNewTeamName(name);
  }, []);

  const handleTeamSelect = (teamId: string | null) => {
    setSelectedTeamId(teamId);
  };

  const handleCreateTeam = useCallback(() => {
    if (!newTeamName.trim()) {
      showSnackbar('Team name is required', SnackbarSeverity.ERROR);
      return;
    }

    if (addToTeamDialogOpen) {
      const newTeam = teamUtils.createNewTeam(newTeamName);
      storageUtils.saveTeam(newTeam);
      setSelectedTeamId(newTeam.id);
      showSnackbar(`Team "${newTeamName}" created successfully!`);
      setCreateTeamDialogOpen(false);
      setNewTeamName('');
      return;
    }

    const newTeam = teamUtils.createNewTeam(newTeamName);

    let updatedTeam = newTeam;
    for (const pokemon of selectedPokemonList) {
      updatedTeam = teamUtils.addPokemonToTeam(updatedTeam, pokemon);
    }

    storageUtils.saveTeam(updatedTeam);

    setCreateTeamDialogOpen(false);
    setSelectedPokemonList([]);
    setNewTeamName('');

    showSnackbar(`Team "${newTeamName}" created successfully!`);

    if (navigateToTeams) {
      navigateToTeams();
    }
  }, [
    newTeamName,
    selectedPokemonList,
    showSnackbar,
    selectedTeamId,
    addToTeamDialogOpen,
    navigateToTeams,
  ]);

  return (
    <Box
      sx={{
        height: '100%',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: mainContentWidth,
          transition: 'width 0.3s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            p: 3,
            bgcolor: 'background.paper',
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
          }}
        >
          <PokemonSearchForm
            loading={loading}
            onSearch={handleSearch}
            onTypeFilter={handleTypeFilter}
            showCreateTeamButton={selectedPokemonList.length > 0}
            onCreateTeamClick={handleClickCreateTeamButton}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {loading && pokemonList.length === 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress />
            </Box>
          )}
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: 3,
          }}
        >
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <LinearProgress sx={{ width: '100%' }} />
            </Box>
          )}
          <Grid container spacing={3}>
            {pokemonList.map((pokemon, index) => {
              const isLastElement = index === pokemonList.length - 1;
              const detailedPokemon = pokemon as PokemonDetailed;

              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={pokemon.id}
                  ref={isLastElement ? lastPokemonElementRef : undefined}
                >
                  <PokemonCard
                    pokemon={detailedPokemon}
                    onClick={handlePokemonClick}
                    onFilterByTypes={handleTypeFilter}
                    onAddToTeam={handleDirectAddToTeam}
                    selectable={true}
                    onSelectChange={handlePokemonSelectChange}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>

      <PokemonDetailDrawer
        open={detailDrawerOpen}
        pokemon={selectedPokemon}
        onClose={() => setDetailDrawerOpen(false)}
        onAddToTeam={handleAddToTeam}
      />

      <AddToTeamDialog
        open={addToTeamDialogOpen}
        pokemon={selectedPokemon}
        onClose={() => setAddToTeamDialogOpen(false)}
        onCreateNewTeamClick={handleCreateNewTeam}
        onSuccess={showSnackbar}
        onError={message => showSnackbar(message, SnackbarSeverity.ERROR)}
        onTeamSelect={handleTeamSelect}
        selectedTeamId={selectedTeamId}
      />

      <TeamDialog
        open={createTeamDialogOpen}
        title="Create New Team"
        teamName={newTeamName}
        onTeamNameChange={handleTeamNameChange}
        onClose={() => setCreateTeamDialogOpen(false)}
        onCreateTeam={handleCreateTeam}
        saveButtonText="Create Team"
      />

      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </Box>
  );
}
