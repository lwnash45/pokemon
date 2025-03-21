import { Box, Typography, Card, CardContent } from '@mui/material';
import { ColorChip } from '../../shared/color-chip';

interface TypeDisplayProps {
  title: string;
  types: Record<string, number>;
}

export function TypeDisplay({ title, types }: TypeDisplayProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {Object.entries(types).map(([type]) => (
            <ColorChip key={type} type={type} />
          ))}
          {Object.keys(types).length === 0 && (
            <Typography variant="body2">No {title.toLowerCase()} found</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
