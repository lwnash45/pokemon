'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, CircularProgress, Alert } from '@mui/material';
import { storageUtils } from '../../../lib/utils/storage-utils';
import { teamUtils } from '../../../lib/utils/team-utils';
import { Team, TeamStats } from '../../../lib/dto/pokemon-dto';
import { TeamSelector } from './team-selector';
import { TeamPreview } from './team-preview';
import { StatsComparisonTable } from './stats-comparison-table';
import { TypeDisplay } from './type-desplay';

export default function ComparePage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamOneId, setTeamOneId] = useState<string>('');
  const [teamTwoId, setTeamTwoId] = useState<string>('');
  const [teamOneStats, setTeamOneStats] = useState<TeamStats | null>(null);
  const [teamTwoStats, setTeamTwoStats] = useState<TeamStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = () => {
    const savedTeams = storageUtils.getTeams();
    setTeams(savedTeams);

    if (savedTeams.length >= 2) {
      setTeamOneId(savedTeams[0].id);
      setTeamTwoId(savedTeams[1].id);
    } else if (savedTeams.length === 1) {
      setTeamOneId(savedTeams[0].id);
    }
  };

  const handleCompare = async () => {
    if (!teamOneId || !teamTwoId) {
      setError('Please select two teams to compare');
      return;
    }

    if (teamOneId === teamTwoId) {
      setError('Please select two different teams');
      return;
    }

    const teamOne = teams.find(t => t.id === teamOneId);
    const teamTwo = teams.find(t => t.id === teamTwoId);

    if (!teamOne || !teamTwo) {
      setError('Selected teams not found');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const statsOne = await teamUtils.calculateTeamStats(teamOne);
      const statsTwo = await teamUtils.calculateTeamStats(teamTwo);

      setTeamOneStats(statsOne);
      setTeamTwoStats(statsTwo);
    } catch (err) {
      setError('Error calculating team stats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStrongerTeam = (statName: keyof TeamStats) => {
    if (!teamOneStats || !teamTwoStats) return null;

    if (statName === 'weaknesses' || statName === 'resistances') {
      const team1Count = Object.keys(teamOneStats[statName]).length;
      const team2Count = Object.keys(teamTwoStats[statName]).length;

      if (statName === 'weaknesses') {
        return team1Count < team2Count ? 1 : team1Count > team2Count ? 2 : 0;
      } else {
        return team1Count > team2Count ? 1 : team1Count < team2Count ? 2 : 0;
      }
    }

    if (typeof teamOneStats[statName] === 'number' && typeof teamTwoStats[statName] === 'number') {
      const stat1 = teamOneStats[statName] as number;
      const stat2 = teamTwoStats[statName] as number;
      return stat1 > stat2 ? 1 : stat1 < stat2 ? 2 : 0;
    }

    return 0;
  };

  const teamOne = teams.find(t => t.id === teamOneId);
  const teamTwo = teams.find(t => t.id === teamTwoId);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Compare Teams
      </Typography>

      {teams.length < 2 ? (
        <Alert severity="info" sx={{ mb: 4 }}>
          You need at least two teams to compare. Please create more teams.
        </Alert>
      ) : (
        <>
          <TeamSelector
            teams={teams}
            teamOneId={teamOneId}
            teamTwoId={teamTwoId}
            onTeamOneChange={id => setTeamOneId(id)}
            onTeamTwoChange={id => setTeamTwoId(id)}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleCompare}
              disabled={loading || !teamOneId || !teamTwoId}
            >
              {loading ? <CircularProgress size={24} /> : 'Compare Teams'}
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          {teamOneStats && teamTwoStats && teamOne && teamTwo && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Comparison Results
              </Typography>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                  <TeamPreview team={teamOne} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TeamPreview team={teamTwo} />
                </Grid>
              </Grid>

              <StatsComparisonTable
                teamOneName={teamOne.name}
                teamTwoName={teamTwo.name}
                teamOneStats={teamOneStats}
                teamTwoStats={teamTwoStats}
                getStrongerTeam={getStrongerTeam}
              />

              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                  <TypeDisplay title="Team 1 Type Weaknesses" types={teamOneStats.weaknesses} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TypeDisplay title="Team 2 Type Weaknesses" types={teamTwoStats.weaknesses} />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TypeDisplay title="Team 1 Type Resistances" types={teamOneStats.resistances} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TypeDisplay title="Team 2 Type Resistances" types={teamTwoStats.resistances} />
                </Grid>
              </Grid>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
