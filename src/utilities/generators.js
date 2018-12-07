const randomString = (numberOfChars = 1) => {
  if (numberOfChars < 0) { numberOfChars = 1; }

  return Math.random().toString(36).substring(2, numberOfChars + 2).toUpperCase();
}

const randomInt = (min = 0,max = 10) => {
  return Math.floor(Math.random()*(max-min+1)+min);
}

export function generateAvatarUrl() {
  const str = randomString(5);

  return `https://api.adorable.io/avatars/85/${str}.png`;
}

export function generateTournamentName() {
  const first = ['Dangerous', 'Amazing', 'Fiery', 'Wrecking', 'Unstoppable', 'Dynamite']
  const second = ['reverse', 'Angelina', 'george', 'glue', 'budapest', 'scoop', 'jam']

  const randFirst = first[randomInt(0, first.length - 1)];
  const randSecond = second[randomInt(0, second.length - 1)];

  return randFirst + ' ' + randSecond;
}
