import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { PokemonDetailed, Team } from '../../../lib/dto/pokemon-dto';
import { TeamSelectMenuItem } from '../../shared/team-select-menu-item';
import { storageUtils } from '../../../lib/utils/storage-utils';
import { teamUtils } from '../../../lib/utils/team-utils';

interface AddToTeamDialogProps {
  open: boolean;
  pokemon: PokemonDetailed | null;
  onClose: () => void;
  onCreateNewTeamClick: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onTeamSelect: (teamId: string | null) => void;
  selectedTeamId: string | null;
}

export function AddToTeamDialog({
  open,
  pokemon,
  onClose,
  onCreateNewTeamClick,
  onSuccess,
  onError,
  onTeamSelect,
  selectedTeamId,
}: AddToTeamDialogProps) {
  const teams = storageUtils.getTeams();

  useEffect(() => {
    const teams = storageUtils.getTeams();
    if (teams.length > 0) {
      onTeamSelect(teams[0].id);
    }
  }, []);

  const handleAddToExistingTeam = () => {
    if (!pokemon || !selectedTeamId) return;

    const team = storageUtils.getTeamById(selectedTeamId);
    if (!team) return;

    if (teamUtils.canAddPokemon(team)) {
      const updatedTeam = teamUtils.addPokemonToTeam(team, pokemon);
      storageUtils.saveTeam(updatedTeam);
      onClose();

      onSuccess(`${pokemon.name} added to team "${team.name}"!`);
    } else {
      onError('Team already has 6 Pokémon');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add to Team</DialogTitle>
      <DialogContent>
        {teams.length > 0 ? (
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="team-select-label">Select Team</InputLabel>
              <Select
                labelId="team-select-label"
                value={selectedTeamId}
                label="Select Team"
                onChange={e => onTeamSelect(e.target.value)}
              >
                {teams.map(team => (
                  <MenuItem value={team.id} key={team.id}>
                    <TeamSelectMenuItem team={team} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button sx={{ mt: 2 }} fullWidth variant="text" onClick={onCreateNewTeamClick}>
              Or create a new team
            </Button>
          </Box>
        ) : (
          <Typography>No teams yet. Create your first team!</Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ paddingRight: 2, paddingBottom: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        {teams.length > 0 && (
          <Button variant="contained" onClick={handleAddToExistingTeam}>
            Add to Team
          </Button>
        )}
        {teams.length === 0 && (
          <Button variant="contained" onClick={onCreateNewTeamClick}>
            Create New Team
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
