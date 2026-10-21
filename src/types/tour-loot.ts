import type { LootItem } from "./loot-item";

/**
 * Interface for earned rewards upon a tour completion.
 */
export interface TourLoot {
  /**
   * Price of the basic killstreak kit.
   */
  basicKitPrice: number;
  /**
   * Guaranteed specialized killstreak kit data.
   */
  specFabricator: LootItem;
  /**
   * Professional killstreak fabricator data, if earned.
   */
  proFabricator: LootItem | null;
  /**
   * Australium weapon data, if earned.
   */
  australium: LootItem | null;
  robotParts: {
    common: number;
    rare: number;
  };
  /**
   * Any additional specialized killstreak fabricators earned in prior missions.
   */
  additionalSpecFabs: LootItem[];
}
