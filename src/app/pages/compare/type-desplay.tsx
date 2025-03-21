import { Box, Typography, Card, CardContent, Chip } from '@mui/material';
import { useTypeColor } from '../../../lib/utils/type-utils';

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

const ColorChip = ({ type }: { type: string }) => {
  const color = useTypeColor(type);
  return <Chip label={type} sx={{ bgcolor: color, color: 'white' }} />;
};
