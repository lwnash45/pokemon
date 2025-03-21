import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { TeamStats } from '../../../lib/dto/pokemon-dto';
import Pokeball from '../../svgs/pokeball';

interface StatsComparisonTableProps {
  teamOneName: string;
  teamTwoName: string;
  teamOneStats: TeamStats;
  teamTwoStats: TeamStats;
  getStrongerTeam: (statName: keyof TeamStats) => number | null;
}

export function StatsComparisonTable({
  teamOneName,
  teamTwoName,
  teamOneStats,
  teamTwoStats,
  getStrongerTeam,
}: StatsComparisonTableProps) {
  return (
    <TableContainer component={Paper} sx={{ mb: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">{teamOneName}</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="center">Stat</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left">{teamTwoName}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="right">{teamOneStats.hp}</TableCell>
            <TableCell align="right">
              {getStrongerTeam('hp') === 1 ? <Pokeball width={20} height={20} /> : ''}
            </TableCell>
            <TableCell align="center" component="th" scope="row">
              HP
            </TableCell>
            <TableCell align="left">
              {getStrongerTeam('hp') === 2 ? <Pokeball width={20} height={20} /> : ''}
            </TableCell>
            <TableCell align="left">{teamTwoStats.hp}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">{teamOneStats.attack}</TableCell>
            <TableCell align="right">
              {getStrongerTeam('attack') === 1 ? <Pokeball width={20} height={20} /> : ''}
            </TableCell>
            <TableCell align="center" component="th" scope="row">
              Attack
            </TableCell>
            <TableCell align="left">
              {getStrongerTeam('attack') === 2 ? <Pokeball width={20} height={20} /> : ''}
            </TableCell>
            <TableCell align="left">{teamTwoStats.attack}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">{teamOneStats.defense}</TableCell>
            <TableCell align="right">
              {getStrongerTeam('defense') === 1 ? <Pokeball width={20} height={20} /> : ''}
            </TableCell>
            <TableCell align="center" component="th" scope="row">
              Defense
            </TableCell>
            <TableCell align="left">
              {getStrongerTeam('defense') === 2 ? <Pokeball width={20} height={20} /> : ''}
            </TableCell>
            <TableCell align="left">{teamTwoStats.defense}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">{teamOneStats.specialAttack}</TableCell>
            <TableCell align="right">
              {getStrongerTeam('specialAttack') === 1 ? <Pokeball width={20} height={20} /> : ''}
            </TableCell>
            <TableCell align="center" component="th" scope="row">
              Special Attack
            </TableCell>
            <TableCell align="left">
              {getStrongerTeam('specialAttack') === 2 ? <Pokeball width={20} height={20} /> : ''}
            </TableCell>
            <TableCell align="left">{teamTwoStats.specialAttack}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">{teamOneStats.specialDefense}</TableCell>
            <TableCell align="right">
              {getStrongerTeam('specialDefense') === 1 ? <Pokeball width={20} height={20} /> : ''}
            </TableCell>
            <TableCell align="center" component="th" scope="row">
              Special Defense
            </TableCell>
            <TableCell align="left">
              {getStrongerTeam('specialDefense') === 2 ? <Pokeball width={20} height={20} /> : ''}
            </TableCell>
            <TableCell align="left">{teamTwoStats.specialDefense}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">{teamOneStats.speed}</TableCell>
            <TableCell align="right">
              {getStrongerTeam('speed') === 1 ? <Pokeball width={20} height={20} /> : ''}
            </TableCell>
            <TableCell align="center" component="th" scope="row">
              Speed
            </TableCell>
            <TableCell align="left">
              {getStrongerTeam('speed') === 2 ? <Pokeball width={20} height={20} /> : ''}
            </TableCell>
            <TableCell align="left">{teamTwoStats.speed}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">{Object.keys(teamOneStats.weaknesses).length}</TableCell>
            <TableCell align="right">
              {getStrongerTeam('weaknesses') === 1 ? <Pokeball width={20} height={20} /> : ''}
            </TableCell>
            <TableCell align="center" component="th" scope="row">
              Type Weaknesses
            </TableCell>
            <TableCell align="left">
              {getStrongerTeam('weaknesses') === 2 ? <Pokeball width={20} height={20} /> : ''}
            </TableCell>
            <TableCell align="left">{Object.keys(teamTwoStats.weaknesses).length}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">{Object.keys(teamOneStats.resistances).length}</TableCell>
            <TableCell align="right">
              {getStrongerTeam('resistances') === 1 ? <Pokeball width={20} height={20} /> : ''}
            </TableCell>
            <TableCell align="center" component="th" scope="row">
              Type Resistances
            </TableCell>
            <TableCell align="left">
              {getStrongerTeam('resistances') === 2 ? <Pokeball width={20} height={20} /> : ''}
            </TableCell>
            <TableCell align="left">{Object.keys(teamTwoStats.resistances).length}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
