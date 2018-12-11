import orderBy from 'lodash/orderBy';

export function orderByProperty(arr, propertyName, mode) {
  if (mode !== 'asc' || mode !== 'desc') { mode = 'asc'}

  return orderBy(arr, propertyName, mode);
}

export function calculateGames(playerIdsSelected, playersAll) {
  const filtered = playersAll.filter(player => playerIdsSelected.indexOf(player.uid) > -1);
  const sorted = orderBy(filtered, 'rating', 'asc');

  

  return sorted;
  //
}