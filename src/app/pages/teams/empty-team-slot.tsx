import { Card, Typography } from '@mui/material';

export function EmptyTeamSlot() {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: theme => theme.palette.pokemon.emptySlotBg,
        minHeight: '250px',
        border: theme => `2px dashed ${theme.palette.pokemon.emptySlotBorder}`,
      }}
    >
      <Typography color="text.secondary">Empty Slot</Typography>
    </Card>
  );
}
