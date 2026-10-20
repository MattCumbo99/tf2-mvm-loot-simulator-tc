import type { LootItem } from "./loot-item";

export interface TourLoot {
  specFabricator: LootItem;
  proFabricator: LootItem | null;
  australium: LootItem | null;
  robotParts: {
    common: number;
    rare: number;
  };
}
