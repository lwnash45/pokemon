import { FormControl, InputLabel, Select, Grid, Typography, MenuItem } from '@mui/material';
import { Team } from '../../../lib/dto/pokemon-dto';
import { TeamSelectMenuItem } from '../../shared/team-select-menu-item';

interface TeamSelectorProps {
  teams: Team[];
  teamOneId: string;
  teamTwoId: string;
  onTeamOneChange: (id: string) => void;
  onTeamTwoChange: (id: string) => void;
}

export function TeamSelector({
  teams,
  teamOneId,
  teamTwoId,
  onTeamOneChange,
  onTeamTwoChange,
}: TeamSelectorProps) {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} md={5}>
        <FormControl fullWidth>
          <InputLabel id="team-one-label">First Team</InputLabel>
          <Select
            labelId="team-one-label"
            value={teamOneId}
            label="First Team"
            onChange={e => onTeamOneChange(e.target.value)}
          >
            {teams.map(team => (
              <MenuItem value={team.id} key={`one-${team.id}`} sx={{ width: '100%' }}>
                <TeamSelectMenuItem team={team} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={2}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Typography variant="h5">VS</Typography>
      </Grid>
      <Grid item xs={12} md={5}>
        <FormControl fullWidth>
          <InputLabel id="team-two-label">Second Team</InputLabel>
          <Select
            labelId="team-two-label"
            value={teamTwoId}
            label="Second Team"
            onChange={e => onTeamTwoChange(e.target.value)}
          >
            {teams.map(team => (
              <MenuItem value={team.id} key={`two-${team.id}`} sx={{ width: '100%' }}>
                <TeamSelectMenuItem team={team} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
