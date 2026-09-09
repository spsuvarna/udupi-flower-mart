/**
 * EDIT FLOWER PRICES HERE.
 *
 * Update these three amounts whenever your buying rate changes, then commit
 * the change to redeploy the website. Keep `original` and `selling` equal
 * when there is no genuine discount so customers see a clear market rate.
 */
export const flowerPrices = {
  malligeChendu: { original: 150, selling: 150 },
  malligeAtte: { original: 600, selling: 600 },
  jaaji: { original: 120, selling: 120 },
} as const;
