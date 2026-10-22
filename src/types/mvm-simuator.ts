import type { LootItem } from "./loot-item";
import type { SimulationStats } from "./simulation-stats";
import type { TourLoot } from "./tour-loot";

export interface MvmSimulator {
  tours: TourLoot[];
  inventory: LootItem[];
  australiums: LootItem[];
  highValueFabs: LootItem[];
  stats: SimulationStats;
  runSimulation: (count: number) => void;
  resetSimulation: () => void;
}
