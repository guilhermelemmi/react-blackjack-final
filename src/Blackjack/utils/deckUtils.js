export const deck = [
  "As",
  "Ac",
  "Ah",
  "Ad",
  "2s",
  "2c",
  "2h",
  "2d",
  "3s",
  "3c",
  "3h",
  "3d",
  "4s",
  "4c",
  "4h",
  "4d",
  "5s",
  "5c",
  "5h",
  "5d",
  "6s",
  "6c",
  "6h",
  "6d",
  "7s",
  "7c",
  "7h",
  "7d",
  "8s",
  "8c",
  "8h",
  "8d",
  "9s",
  "9c",
  "9h",
  "9d",
  "10s",
  "10c",
  "10h",
  "10d",
  "Js",
  "Jc",
  "Jh",
  "Jd",
  "Qs",
  "Qc",
  "Qh",
  "Qd",
  "Ks",
  "Kc",
  "Kh",
  "Kd",
];

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
