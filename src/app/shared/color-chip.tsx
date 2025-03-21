import { Chip } from '@mui/material';
import { useTypeColor } from '../../lib/utils/type-utils';

interface ColorChipProps {
  type: string;
}

export const ColorChip = ({ type }: ColorChipProps) => {
  const color = useTypeColor(type);
  return <Chip label={type} sx={{ bgcolor: color, color: 'white' }} />;
};
