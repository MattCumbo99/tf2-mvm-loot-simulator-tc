import type { LootItem } from "./loot-item";
import type { SimulationStats } from "./simulation-stats";

export interface MvmSimulator {
  inventory: LootItem[];
  stats: SimulationStats;
  runSimulation: (count: number) => void;
  resetSimulation: () => void;
}
