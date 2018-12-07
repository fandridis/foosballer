/**
 * Generate a random alphanumeric of XXX number of characters
 * If a negative number is passed, it counts it as 1
 * @param {num} numberOfChars
 * 
 * @returns {string} the string generated
 */

const randomString = (numberOfChars = 1) => {
  if (numberOfChars < 0) { numberOfChars = 1; }

  return Math.random().toString(36).substring(2, numberOfChars + 2).toUpperCase();
}

/**
 * Generate a random integer between two numbers
 * If only one parameter is passed it calculates from 0 to MAX
 * @param {num} min from this number (included)
 * @param {num} max to this number (included)
 * 
 * @returns {num} the integer generated
 */
const randomInt = (min,max) => {
  if (!max) {
    max = min;
    min = 0;
  }

  return Math.floor(Math.random()*(max-min+1)+min);
}

export function generateAvatarUrl() {
  const str = randomString(5);

  return `https://api.adorable.io/avatars/85/${str}.png`;
}

export function generateTournamentName() {
  const first = ['Dangerous', 'Amazing', 'Fiery', 'Wrecking', 'Unstoppable', 'Dynamite', 'Lengendary', 'Outstanding']
  const second = ['reverse', 'Angelina', 'george', 'glue', 'budapest', 'scoop', 'jam', 'cowslide', 'muppets', 'titanium wall']

  const randFirst = first[randomInt(0, first.length - 1)];
  const randSecond = second[randomInt(0, second.length - 1)];

  return randFirst + ' ' + randSecond;
}
