import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

interface TeamDialogProps {
  open: boolean;
  title: string;
  teamName: string;
  onClose: () => void;
  onTeamNameChange: (name: string) => void;
  onSave: () => void;
}

export function TeamDialog({
  open,
  title,
  teamName,
  onClose,
  onTeamNameChange,
  onSave,
}: TeamDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Team Name"
          fullWidth
          variant="outlined"
          value={teamName}
          onChange={e => onTeamNameChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
