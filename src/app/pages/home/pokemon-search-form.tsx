import { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  SelectChangeEvent,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import { useTypeColor } from '../../../lib/utils/type-utils';
import { ALL_POKEMON_TYPES } from '../../../lib/types/pokemon-types';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

interface PokemonSearchFormProps {
  loading: boolean;
  onSearch: (query: string) => void;
  onTypeFilter: (types: string[]) => void;
  showCreateTeamButton?: boolean;
  onCreateTeamClick?: () => void;
}

export function PokemonSearchForm({
  loading,
  onSearch,
  onTypeFilter,
  showCreateTeamButton = false,
  onCreateTeamClick,
}: PokemonSearchFormProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    if (event.target.value.trim() === '') {
      onSearch('');
    }
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleTypesChange = (event: SelectChangeEvent<string[]>) => {
    const types = event.target.value as string[];
    setSelectedTypes(types);
    onTypeFilter(types);
  };

  const handleClearTypes = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSelectedTypes([]);
    onTypeFilter([]);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between' }}>
      <TextField
        label="Search Pokémon"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={e => e.key === 'Enter' && handleSearch()}
        sx={{ flexGrow: 1, minWidth: '200px' }}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="search"
                onClick={handleSearch}
                disabled={loading}
                size="small"
              >
                <SearchIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <FormControl sx={{ minWidth: '200px' }} size="small">
          <InputLabel id="type-select-label">Filter by Type</InputLabel>
          <Select
            labelId="type-select-label"
            value={selectedTypes}
            label="Filter by Type"
            onChange={handleTypesChange}
            multiple
            size="small"
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map(type => (
                  <ColorChip key={type} type={type} />
                ))}
              </Box>
            )}
            endAdornment={
              selectedTypes.length > 0 ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear types"
                    onClick={handleClearTypes}
                    edge="end"
                    size="small"
                    sx={{ mr: 0.5 }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null
            }
            IconComponent={() => null}
          >
            {ALL_POKEMON_TYPES.map(type => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {showCreateTeamButton && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={onCreateTeamClick}
            size="small"
          >
            Create Team
          </Button>
        )}
      </Box>
    </Box>
  );
}

const ColorChip = ({ type }: { type: string }) => {
  const color = useTypeColor(type);
  return <Chip label={type} sx={{ bgcolor: color, color: 'white' }} />;
};
