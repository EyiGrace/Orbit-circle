// services/quiz/traitRarityService.ts

export const TRAIT_FREQUENCIES: Record<string, number> = {
  AN: 63,
  OR: 63,
  CM: 63,
  CU: 53,
  VM: 46,
  LE: 29,
  LA: 28,
  PS: 27,
  BT: 21,
  HO: 20,
  CR: 19,
  PR: 15,
  SC: 13,
  AD: 11,
  AT: 9,
  NR: 8,
  CO: 6,
  EI: 5,
  PE: 3
};

export const TOTAL_CAREERS = 80;

export function rarityMultiplier(traitCode: string) {
  const frequency = TRAIT_FREQUENCIES[traitCode];

  if (!frequency) return 1;

  return Math.log(TOTAL_CAREERS / frequency) + 1;
}