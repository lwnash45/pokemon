'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { PokemonDetailed, Team } from '../../../lib/dto/pokemon-dto';
import { TeamCard } from './team-card';
import { TeamDialog } from '../../shared/team-dialog';
import { storageUtils } from '../../../lib/utils/storage-utils';
import { teamUtils } from '../../../lib/utils/team-utils';
import { SnackbarAlert, SnackbarSeverity } from '../../shared/snackbar-alert';
import { DRAWER_WIDTH, PokemonDetailDrawer } from '../../shared/pokemon-detail-drawer';

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teamName, setTeamName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>(
    SnackbarSeverity.SUCCESS
  );
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetailed | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const mainContentWidth = isDrawerOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%';

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = () => {
    const savedTeams = storageUtils.getTeams();
    setTeams(savedTeams);
  };

  const handleDeleteTeam = (id: string) => {
    const teamToDelete = storageUtils.getTeamById(id);
    if (teamToDelete) {
      const teamName = teamToDelete.name;
      storageUtils.deleteTeam(id);
      loadTeams();
      showSnackbar(`Team "${teamName}" deleted successfully!`);
    }
  };

  const handleEditTeam = (team: Team) => {
    setSelectedTeam(team);
    setTeamName(team.name);
    setIsEditMode(true);
    setDialogOpen(true);
  };

  const handleRemovePokemon = (teamId: string, pokemonId: number) => {
    const team = teams.find(t => t.id === teamId);
    if (!team) return;

    const updatedTeam = teamUtils.removePokemonFromTeam(team, pokemonId);
    storageUtils.saveTeam(updatedTeam);
    loadTeams();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleTeamNameChange = (name: string) => {
    setTeamName(name);
  };

  const handleSaveTeam = () => {
    if (!teamName.trim()) return;

    if (isEditMode && selectedTeam) {
      const updatedTeam = { ...selectedTeam, name: teamName };
      storageUtils.saveTeam(updatedTeam);
      showSnackbar(`Team "${teamName}" updated successfully!`);
    } else {
      const newTeam = teamUtils.createNewTeam(teamName);
      storageUtils.saveTeam(newTeam);
      showSnackbar(`Team "${teamName}" created successfully!`);
    }

    setDialogOpen(false);
    setTeamName('');
    setIsEditMode(false);
    setSelectedTeam(null);
    loadTeams();
  };

  const showSnackbar = (message: string, severity: SnackbarSeverity = SnackbarSeverity.SUCCESS) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handlePokemonClick = (pokemon: PokemonDetailed) => {
    setSelectedPokemon(pokemon);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      <Box
        sx={{
          width: mainContentWidth,
          transition: 'width 0.3s ease',
          height: '100%',
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}
          >
            <Typography variant="h4">My Teams</Typography>
            <Button variant="contained" onClick={() => setDialogOpen(true)}>
              Create New Team
            </Button>
          </Box>

          {teams.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
              You have not created any teams yet. Get started by creating your first team!
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {teams.map(team => (
                <Grid item xs={12} key={team.id}>
                  <TeamCard
                    team={team}
                    onEditTeam={handleEditTeam}
                    onDeleteTeam={handleDeleteTeam}
                    onRemovePokemon={handleRemovePokemon}
                    onPokemonClick={handlePokemonClick}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>

      <TeamDialog
        open={dialogOpen}
        title={isEditMode ? 'Edit Team' : 'Create New Team'}
        teamName={teamName}
        onClose={handleCloseDialog}
        onTeamNameChange={handleTeamNameChange}
        onSave={handleSaveTeam}
        saveButtonText={isEditMode ? 'Save Changes' : 'Create Team'}
      />

      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />

      <PokemonDetailDrawer
        pokemon={selectedPokemon}
        open={isDrawerOpen}
        onClose={closeDrawer}
        onAddToTeam={() => {}}
        hideAddToTeamButton={true}
      />
    </Box>
  );
}
