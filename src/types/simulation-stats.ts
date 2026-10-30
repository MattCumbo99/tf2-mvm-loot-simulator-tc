import type { LootItem } from "./loot-item";
import type { MvmTour } from "./mvm-tour";

/**
 * A grouped data field holding overall statistics of prior tour simulations.
 */
export interface SimulationStats {
  /**
   * Total amount of tours simulated.
   */
  toursCompleted: number;

  /**
   * Total amount of money spent on purchasing tour of duty tickets.
   */
  totalSpent: number;

  /**
   * Combined total value of earned loot.
   */
  totalLootValue: number;

  /**
   * Difference between total spend vs. loot value. A negative number indicates profit loss.
   */
  netProfit: number;

  /**
   * Amount of golden frying pans earned.
   */
  panCount: number;

  /**
   * Percentage earned back on earnings.
   */
  roiPercentage: number;

  /**
   * Accumulated count of robot parts.
   */
  totalRobotParts: number;

  /**
   * Tour number of the first pan drop.
   */
  firstPanTourNum?: number;

  /**
   * Total specialized killstreak fabricators earned.
   */
  totalSpecFabs: number;

  /**
   * Total professional killstreak fabricators earned.
   */
  totalProFabs: number;

  /**
   * Total australiums earned.
   */
  totalAustraliums: number;

  /**
   * Most profitable tour.
   */
  bestTour?: MvmTour;

  /**
   * Count of tours where the profit yield at least covers the cost of a single tour.
   */
  totalBreakEvenTours: number;

  /**
   * Most amount of times in a row where a tour did not reward either a professional killstreak fabricator or
   * an australium.
   */
  longestUnluckyStreak: number;

  /**
   * Most amount of times in a row where a tour rewarded either a professional killstreak fabricator or an
   * australium.
   */
  longestLuckyStreak: number;

  /**
   * Most profitable professional killstreak fabricator.
   */
  bestProFab?: LootItemStat;
}

export interface LootItemStat {
  item: LootItem;
  tourNumber: number;
}
