export function calculateScoreChange(match) {
  console.log('match @ updateRatings: ', match);
  if (match.team1 === 'pass' || match.team2 === 'pass') { return 0 }

  const team1 = match.team1;
  const team2 = match.team2;
  const winner = match.team1.index === match.winner ? 1 : 2;
  
  const team1avg = (team1.player1.rating + team1.player2.rating) / 2;
  const team2avg = (team2.player1.rating + team2.player2.rating) / 2;
  
  const r1 = 10 ** (team1avg / 400 );
  const r2 = 10 ** (team2avg / 400 );
  
  const e1 = r1 / (r1 + r2);
  const e2 = r2 / (r1 + r2);
  
  const s1 = winner === 1 ? 1 : 0;
  const s2 = winner === 2 ? 1 : 0;
  
  const K = 32;
  
  let team1avgNew = Math.round(team1avg + K * (s1 - e1));
  let team2avgNew = Math.round(team2avg + K * (s2 - e2));

  team1avgNew = team1avg === team1avgNew 
    ? winner === 1
      ? team1avg + 1 
      : team1avgNew - 1
    : team1avgNew

  team2avgNew = team2avg === team1avgNew 
    ? winner === 1
      ? team2avg + 1 
      : team2avgNew - 1
    : team2avgNew
  
  const difference = winner === 1 ? team1avgNew - team1avg : team2avgNew - team2avg;

  return Math.ceil(difference);


}
