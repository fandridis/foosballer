import orderBy from 'lodash/orderBy';

// Create teams by pairing the best with the worst,
// the second-best with the second-worst etc.
export function calculateTeams(players) {
  const playersSorted = orderBy(players, 'rating', 'desc');
  const playersLength = playersSorted.length;
  let teamsTemp = [];
  let teams = {}
  let counter = 0;
  
  if (playersSorted.length % 2 > 0) { return console.log('Uneven players') }
  
  for (let i = 0; i < playersSorted.length / 2; i++) {
    let obj = {
      player1: playersSorted[i],
      player2: playersSorted[playersLength - i - 1],
      name: playersSorted[i].name + ' | ' + playersSorted[playersLength - i - 1].name,
      rating: Math.round((playersSorted[i].rating + playersSorted[playersLength - i - 1].rating) / 2)
    }
    teamsTemp.push(obj)
  }

  let teamsSorted = orderBy(teamsTemp, 'rating', 'desc');
  for (let team of teamsSorted) {
    teams[counter] = team;
    counter++;
  }

  return teams;
}

export function updateMatchAndTournament(data) {
  const { tournament, matchIndex, winningTeamIndex, isPreviouslyResolved } = data;
  const currentRound = tournament.currentRound;
  const match = tournament.rounds[currentRound].matches[matchIndex];
  
  match.winner = winningTeamIndex;
  if (isPreviouslyResolved) { return tournament }

  tournament.matchesRemaining--;
  tournament.rounds[currentRound].matchesRemaining--;

  if (tournament.matchesRemaining === 0) {
    tournament.completed = true;
    return resolveTournament(tournament);
  }

  if (tournament.rounds[currentRound].matchesRemaining === 0) {
    tournament.rounds[currentRound].completed = true;
    // calculateNextRound(tournament);
  }

  console.log('new tournament: ', tournament);
  return tournament;
}





function resolveTournament(tournament) {
  console.log('Tournament is finished!');
}

export function calculateNextRound(tournament) {
  console.log('Calculating next round');
  console.log('tournament: ', tournament);

  let nextSeeds = [];
  let teamsRemaining = {};

  for (let match of tournament.rounds[tournament.currentRound].matches) {
    nextSeeds.push(match.winner);
    if (match.team1.index === match.winner) {
      teamsRemaining[match.winner] = match.team1;
    }
    else {
      teamsRemaining[match.winner] = match.team2;
    }
  }

  console.log('nextSeeds: ', nextSeeds);
  console.log('teamsRemaining: ', teamsRemaining);

  const nextRoundMatches = calculateMatches(nextSeeds, teamsRemaining);

  console.log('nextRoundMatches: ', nextRoundMatches);

  tournament.rounds[tournament.currentRound + 1] = {
    matches: nextRoundMatches,
    matchesRemaining: nextRoundMatches.length,
    completed: false
  }

  tournament.currentRound++;
}

function calculateMatches(seeds, teams) {
  let matches = [];
  let count = 0;

  for (let i = 0; i < seeds.length; i+=2) {
    let match = { winner: null }

    match.team1 = { ...teams[seeds[i]], index: seeds[i] };

    if (teams[seeds[i+1]]) {
      match.team2 = { ...teams[seeds[i+1]], index: seeds[i+1] };
    }
    else { 
      match.team2 = 'pass'
      match.winner = seeds[i];
    }

    matches[count] = match;
    count++;
  }

  return matches;
}