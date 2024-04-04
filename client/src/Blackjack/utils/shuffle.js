// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
export const shuffle = (deck) => {
  const shuffled = [...deck];
  for (let i = 0; i < shuffled.length - 1; i++) {
    const j = randomInRange(i, shuffled.length - 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const randomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
