const randomString = (numberOfChars = 1) => {
  if (numberOfChars < 0) { numberOfChars = 1; }

  return Math.random().toString(36).substring(2, numberOfChars + 2).toUpperCase();
}

export function generateAvatarUrl() {
  const str = randomString(5)

  return `https://api.adorable.io/avatars/85/${str}.png`
}

