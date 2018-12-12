import orderBy from 'lodash/orderBy';

export function orderByProperty(arr, propertyName, mode) {
  if (mode !== 'asc' || mode !== 'desc') { mode = 'asc'}

  return orderBy(arr, propertyName, mode);
}

export function isPowerOfX(num, x) {
  return Number.isInteger(Math.log(num) / Math.log(x));
}

export function nextPowerOfTwo(n) {
  if (n === 0) return 1;
  n--
  n |= n >> 1
  n |= n >> 2
  n |= n >> 4
  n |= n >> 8
  n |= n >> 16
  return n+1;
}

// Create teams by pairing the best with the worst,
// the second-best with the second-worst etc.
export function calculateTeams(players) {
  const playersSorted = orderBy(players, 'rating', 'desc');
  const playersLength = playersSorted.length;
  let teams = [];
  
  if (playersSorted.length % 2 > 0) { return console.log('Uneven players') }
  
  for (let i = 0; i < playersSorted.length / 2; i++) {
    let obj = {
      player1: playersSorted[i],
      player2: playersSorted[playersLength - i - 1],
      name: playersSorted[i].name + ' | ' + playersSorted[playersLength - i - 1].name,
      rating: Math.round((playersSorted[i].rating + playersSorted[playersLength - i - 1].rating) / 2)
    }
    teams.push(obj)
  }
  
  return teams;
}