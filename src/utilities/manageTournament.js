import orderBy from 'lodash/orderBy';
import * as manageRatings from './manageRatings';

/**
 * Create teams by pairing the best with the worst,
 * the second-best with the second-worst etc.
 */
export function calculateRandomTeams(players, tournamentType) {

  if (tournamentType === '1v1') { return calculateRandomSingles(players) }
  return calculateRandomDoubles(players)
}

function calculateRandomSingles(players) {
  console.log('Calculating singles for players: ', players);
}

function calculateRandomDoubles(players) {
  console.log('players: ', players);
  // Stopping if an odd ammount of players is passed, as we cannot form complete teams.
  if (players.length % 2 > 0) { return console.log('Uneven players - cannot continue') }

  const playersSorted = orderBy(players, 'ratings.doubles', 'desc');
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
      rating: Math.round((playersSorted[i].ratings.doubles + playersSorted[playersLength - i - 1].ratings.doubles) / 2)
    }
    teamsTemp.push(obj)
  }

  let teamsSorted = orderBy(teamsTemp, 'rating', 'desc');
  for (let team of teamsSorted) {
    teams[counter] = team;
    counter++;
  }

  console.log('Random double teams: ', teams);
  return teams;
}

/**
 * Update tournament contents.
 * Runs when the user resolves a match by picking a winning team
 */
export function updateMatchAndTournament(data) {
  const { tournament, matchIndex, winningTeamIndex, isPreviouslyResolved } = data;
  const currentRound = tournament.currentRound;
  const match = tournament.rounds[currentRound].matches[matchIndex];

  // Update the winning team and immediately return if the update was on an already resolved match
  match.winner = winningTeamIndex;
  if (isPreviouslyResolved) { return tournament }

  // Otherwise update further details of the round and match
  tournament.matchesRemaining--;
  tournament.rounds[currentRound].matchesRemaining--;

  if (tournament.rounds[currentRound].matchesRemaining === 0) {
    tournament.rounds[currentRound].completed = true;
  }

  return tournament;
}

/**
 * Calculate the next round of a knockout tournament
 * Runs when the user has completed all matches of the previous round
 * and clicks to start the next round.
 */

 export function calculateNextRound(tournament) {
   if (tournament.type === '1v1') { return calculateNextRoundSingles(tournament) }
   return calculateNextRoundDoubles(tournament)
 }

 function calculateNextRoundSingles(tournament) {
   console.log('Calculating next round singles: ', tournament);
 }

function calculateNextRoundDoubles(tournament) {
  console.log('Calculating next round for tournament: ', tournament);

  let nextSeeds = [];
  let teamsRemaining = {};
  // let playersUpdatesNeeded = [];
  
  for (let match of tournament.rounds[tournament.currentRound].matches) {
    // playersUpdatesNeeded.push(...manageRatings.calculateNewRatings(match));
    const scoreChange = manageRatings.calculateScoreChange(match, 'doubles');

    nextSeeds.push(match.winner);

    if (match.team2 !== 'pass') {
      if (match.team1.index === match.winner) {
        teamsRemaining[match.winner] = match.team1;
        match.team1.rating += scoreChange;
        match.team1.player1.ratings.doubles += scoreChange;
        match.team1.player2.ratings.doubles += scoreChange;
        match.team1.player1.wins.doubles += 1;
        match.team1.player2.wins.doubles += 1;
        match.team1.player1.longestStreaks.doubles += 1;
        match.team1.player2.longestStreaks.doubles += 1;

        match.team2.rating -= scoreChange;
        match.team2.player1.ratings.doubles -= scoreChange;
        match.team2.player2.ratings.doubles -= scoreChange;
        match.team2.player1.losses.doubles += 1;
        match.team2.player2.losses.doubles += 1;
        match.team2.player1.longestStreaks.doubles = 0;
        match.team2.player2.longestStreaks.doubles = 0;
      }
      else {
        teamsRemaining[match.winner] = match.team2;
        match.team1.rating -= scoreChange;
        match.team1.player1.ratings.doubles -= scoreChange;
        match.team1.player2.ratings.doubles -= scoreChange;
        match.team1.player1.losses.doubles += 1;
        match.team1.player2.losses.doubles += 1;
        match.team1.player1.longestStreaks.doubles = 0;
        match.team1.player2.longestStreaks.doubles = 0;

        match.team2.rating += scoreChange;
        match.team2.player1.ratings.doubles += scoreChange;
        match.team2.player2.ratings.doubles += scoreChange;
        match.team2.player1.wins.doubles += 1;
        match.team2.player2.wins.doubles += 1;
        match.team2.player1.longestStreaks.doubles += 1;
        match.team2.player2.longestStreaks.doubles += 1;
      }
    }
    else {
      teamsRemaining[match.winner] = match.team1;
    }
  }

  const nextRoundMatches = calculateMatches(nextSeeds, teamsRemaining);

  tournament.rounds[tournament.currentRound + 1] = {
    number: tournament.currentRound + 1,
    matches: nextRoundMatches,
    matchesRemaining: nextRoundMatches.length,
    completed: false
  }

  tournament.currentRound++;

  return tournament;
}

/**
 * Update the tournament with the winning team and further details
 * Runs when the user resolves the winning team of the final match.
 */
export function finishTournament(tournament) {
  if (tournament.type === '1v1') { return finishTournamentSingles(tournament) }
  return finishTournamentDoubles(tournament)
}

function finishTournamentSingles(tournament) {
  console.log('Finish tournament singles: ', tournament);
}

function finishTournamentDoubles(tournament) {
  console.log('Finishing the tournament: ', tournament);

  const rounds = Object.keys(tournament.rounds)
  const finalRoundIndex = rounds[rounds.length - 1]
  const finalMatch = tournament.rounds[finalRoundIndex].matches[0];
  const winnerIndex = finalMatch.winner;
  const scoreChange = manageRatings.calculateScoreChange(finalMatch, 'doubles');

  if (finalMatch.team1.index === winnerIndex) {
    tournament.winner = finalMatch.team1.name;

    finalMatch.team1.rating += scoreChange;
    finalMatch.team1.player1.ratings.doubles += scoreChange;
    finalMatch.team1.player2.ratings.doubles += scoreChange;
    finalMatch.team1.player1.wins.doubles += 1;
    finalMatch.team1.player2.wins.doubles += 1;
    finalMatch.team1.player1.longestStreaks.doubles += 1;
    finalMatch.team1.player2.longestStreaks.doubles += 1;

    finalMatch.team2.rating -= scoreChange;
    finalMatch.team2.player1.ratings.doubles -= scoreChange;
    finalMatch.team2.player2.ratings.doubles -= scoreChange;
    finalMatch.team2.player1.losses.doubles += 1;
    finalMatch.team2.player2.losses.doubles += 1;
    finalMatch.team2.player1.longestStreaks.doubles = 0;
    finalMatch.team2.player2.longestStreaks.doubles = 0;
  }
  else {
    tournament.winner = finalMatch.team2.name;

    finalMatch.team1.rating -= scoreChange;
    finalMatch.team1.player1.ratings.doubles -= scoreChange;
    finalMatch.team1.player2.ratings.doubles -= scoreChange;
    finalMatch.team1.player1.losses.doubles += 1;
    finalMatch.team1.player2.losses.doubles += 1;
    finalMatch.team1.player1.longestStreaks.doubles = 0;
    finalMatch.team1.player2.longestStreaks.doubles = 0;

    finalMatch.team2.rating += scoreChange;
    finalMatch.team2.player1.ratings.doubles += scoreChange;
    finalMatch.team2.player2.ratings.doubles += scoreChange;
    finalMatch.team2.player1.wins.doubles += 1;
    finalMatch.team2.player2.wins.doubles += 1;
    finalMatch.team2.player1.longestStreaks.doubles += 1;
    finalMatch.team2.player2.longestStreaks.doubles += 1;
  }
  tournament.completed = true;

  // playersUpdatesNeeded.push(...manageRatings.calculateNewRatings(finalMatch));

  return tournament;
}

/**
 * Calculate the matches of a round depending on
 * the seeds array and the teams
 */
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