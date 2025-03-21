import { useState, useCallback, memo, useMemo } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import { ALL_POKEMON_TYPES } from '../../../lib/types/pokemon-types';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { ColorChip } from '../../shared/color-chip';

interface PokemonSearchFormProps {
  loading: boolean;
  onSearch: (query: string) => void;
  onTypeFilter: (types: string[]) => void;
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  showCreateTeamButton?: boolean;
  onCreateTeamClick?: () => void;
}

export const PokemonSearchForm = memo(function PokemonSearchForm({
  loading,
  onSearch,
  onTypeFilter,
  showCreateTeamButton = false,
  onCreateTeamClick,
  selectedTypes,
  setSelectedTypes,
}: PokemonSearchFormProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    if (event.target.value.trim() === '') {
      onSearch('');
    }
  }, [onSearch]);

  const handleSearch = useCallback(() => {
    onSearch(searchQuery);
  }, [onSearch, searchQuery]);

  const handleTypesChange = useCallback((event: SelectChangeEvent<string[]>) => {
    const types = event.target.value as string[];
    setSelectedTypes(types);
    onTypeFilter(types);
  }, [onTypeFilter, setSelectedTypes]);

  const handleClearTypes = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSelectedTypes([]);
    onTypeFilter([]);
  }, [onTypeFilter, setSelectedTypes]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const searchEndAdornment = useMemo(() => (
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
  ), [handleSearch, loading]);

  const typeSelectEndAdornment = useMemo(() => 
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
  , [selectedTypes.length, handleClearTypes]);

  const renderTypeChips = useCallback((selected: unknown) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {(selected as string[]).map(type => (
        <ColorChip key={type} type={type} />
      ))}
    </Box>
  ), []);

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between' }}>
      <TextField
        label="Search Pokémon"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        sx={{ flexGrow: 1, minWidth: '200px' }}
        size="small"
        InputProps={{
          endAdornment: searchEndAdornment,
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
            renderValue={renderTypeChips}
            endAdornment={typeSelectEndAdornment}
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
});

