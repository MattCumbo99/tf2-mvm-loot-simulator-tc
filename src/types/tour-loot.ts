import type { LootItem } from "./loot-item";

export interface TourLoot {
  basicKit: LootItem;
  specFabricator: LootItem;
  proFabricator?: LootItem;
  australium?: LootItem;
  robotParts: {
    common: number;
    rare: number;
  };
}
