export type DemandTier = "trash" | "low" | "medium" | "high" | "extreme";

export interface TierPriceConfig {
  specPrice: number;
  proPrice: number;
}

export const TIER_PRICES: Record<DemandTier, TierPriceConfig> = {
  trash: { specPrice: 0.07, proPrice: 0.21 },
  low: { specPrice: 0.21, proPrice: 4.56 },
  medium: { specPrice: 0.52, proPrice: 11.93 },
  high: { specPrice: 1.5, proPrice: 23.98 },
  extreme: { specPrice: 3.2, proPrice: 74.76 },
};

export interface WeaponDefinition {
  id: string;
  name: string;
  tier: DemandTier;

  customSpecPrice?: number;
  customProPrice?: number;
}
