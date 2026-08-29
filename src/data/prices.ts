/**
 * EDIT FLOWER PRICES HERE.
 *
 * `original` is the crossed-out regular price.
 * `selling` is the amount customers pay and must not exceed `original`.
 * After editing this file on GitHub, commit the change to redeploy the website.
 */
export const flowerPrices = {
  udupiMallige: { original: 180, selling: 160 },
  sevantige: { original: 240, selling: 220 },
  chenduHoovu: { original: 180, selling: 150 },
  kakada: { original: 160, selling: 140 },
  aboli: { original: 140, selling: 120 },
  localRosesAndZinnias: { original: 200, selling: 180 },
} as const;
