// src/common/utils/rarity.util.ts

export enum Rarity {
  COMMON = 'COMMON',
  RARE = 'RARE',
  SUPER_RARE = 'SUPER_RARE',
  LEGENDARY = 'LEGENDARY',
  MYTHICAL = 'MYTHICAL',
}

export function getRandomRarity(): Rarity {
  const random = Math.random() * 100;
  if (random < 1) return Rarity.MYTHICAL;
  if (random < 8) return Rarity.LEGENDARY;
  if (random < 20) return Rarity.SUPER_RARE;
  if (random < 40) return Rarity.RARE;
  return Rarity.COMMON;
}
