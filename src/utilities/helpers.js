import orderBy from 'lodash/orderBy';

export function orderByProperty(arr, propertyName, mode) {
  if (mode !== 'asc' && mode !== 'desc') { mode = 'asc'}

  return orderBy(arr, propertyName, mode);
}

export function orderByCalcProperty(arr, propertyName, mode) {
  console.log('arr: ', arr);
  if (mode !== 'asc' && mode !== 'desc') { mode = 'asc'}

  if (propertyName === 'winRatio') {
    for (let player of arr) {
      player.winRatio = +(((player.wins / (player.wins + player.losses))*100).toFixed(2))

    }
  }

  return orderBy(arr, 'winRatio', mode);
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
