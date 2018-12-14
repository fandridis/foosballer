export function resolveMatch(data) {
  const { tournament, matchIndex, winningTeamIndex } = data;
  const currentRound = tournament.currentRound;
  const match = tournament.rounds[currentRound].matches[matchIndex];
  
  match.winner = winningTeamIndex;
  tournament.matchesRemaining--;
  tournament.rounds[currentRound].matchesRemaining--;

  if (tournament.rounds[currentRound].matchesRemaining === 0) {
    tournament.rounds[currentRound].completed = true;
  }

  if (tournament.matchesRemaining === 0) {
    tournament.completed = true;
    resolveTournament();
  }

  return tournament;
}





function resolveTournament() {
  console.log('Tournament is finished!');
}