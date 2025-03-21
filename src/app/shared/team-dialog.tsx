import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { useCallback, useMemo, memo } from 'react';

interface TeamDialogProps {
  open: boolean;
  title?: string;
  teamName: string;
  onClose: () => void;
  onTeamNameChange: (name: string) => void;

  onSave?: () => void;
  onCreateTeam?: () => void;

  saveButtonText?: string;
}

/**
 * A reusable dialog component for team creation and editing
 * Compatible with both home page and teams page usage patterns
 */
export const TeamDialog = memo(function TeamDialog({
  open,
  title = 'Create New Team',
  teamName,
  onClose,
  onTeamNameChange,
  onSave,
  onCreateTeam,
  saveButtonText,
}: TeamDialogProps) {
  const handleSave = useCallback(() => {
    if (onSave) {
      onSave();
    } else if (onCreateTeam) {
      onCreateTeam();
    }
  }, [onSave, onCreateTeam]);

  const buttonText = useMemo(
    () => saveButtonText || (title.toLowerCase().includes('edit') ? 'Save Changes' : 'Create Team'),
    [saveButtonText, title]
  );

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onTeamNameChange(e.target.value),
    [onTeamNameChange]
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ width: '100%', minWidth: '300px' }}>
        <TextField
          autoFocus
          margin="dense"
          label="Team Name"
          fullWidth
          variant="outlined"
          value={teamName}
          onChange={handleNameChange}
        />
      </DialogContent>
      <DialogActions sx={{ paddingRight: 2, paddingLeft: 2, paddingBottom: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
