import type { LootItem } from "./loot-item";
import type { MvmTour } from "./mvm-tour";
import type { SimulationStats } from "./simulation-stats";

export interface MvmSimulator {
  tours: MvmTour[];
  australiums: LootItem[];
  highValueFabs: LootItem[];
  stats: SimulationStats;
  runSimulation: (count: number) => void;
  resetSimulation: () => void;
}
