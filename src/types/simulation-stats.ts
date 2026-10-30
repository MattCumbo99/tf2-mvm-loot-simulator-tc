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

  totalRobotParts: number;
  firstPanTourNum?: number;
  specFabCount: number;
  proFabCount: number;
  australiumCount: number;
  mostProfitableTour?: MvmTour;
  leastProfitableTour?: MvmTour;
}
