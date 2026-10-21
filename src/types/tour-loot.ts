import type { LootItem } from "./loot-item";

export interface TourLoot {
  basicKitPrice: number;
  specFabricator: LootItem;
  proFabricator: LootItem | null;
  australium: LootItem | null;
  robotParts: {
    common: number;
    rare: number;
  };
  additionalSpecFabs: LootItem[];
}
