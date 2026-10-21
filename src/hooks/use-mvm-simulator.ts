import { useState } from "react";
import { basicKit, type LootItem } from "../types/loot-item";
import { simulateTourCompletion } from "../utils/simulation-engine";
import type { MvmSimulator } from "../types/mvm-simuator";
import type { TourLoot } from "../types/tour-loot";

const TICKET_COST_PER_TOUR = 0.99 * 4;

export function useMvmSimulator(): MvmSimulator {
  const [inventory, setInventory] = useState<LootItem[]>([]);
  const [tourHistory, setTourHistory] = useState<TourLoot[]>([]);
  const [toursCompleted, setToursCompleted] = useState(0);

  const runSimulation = (count: number) => {
    const newDrops: LootItem[] = [];

    for (let i = 0; i < count; i++) {
      const tourLoot = simulateTourCompletion();

      // Add this tour to the history
      setTourHistory((prev) => [tourLoot, ...prev]);

      newDrops.push(basicKit(tourLoot.basicKitPrice));

      // Add guaranteed spec fabricator
      newDrops.push(tourLoot.specFabricator);

      tourLoot.additionalSpecFabs.forEach((fab) => newDrops.push(fab));

      if (tourLoot.proFabricator) newDrops.push(tourLoot.proFabricator);
      if (tourLoot.australium) newDrops.push(tourLoot.australium);
    }

    setInventory((prev) => [...newDrops, ...prev]);
    setToursCompleted((prev) => prev + count);
  };

  const resetSimulation = () => {
    setInventory([]);
    setTourHistory([]);
    setToursCompleted(0);
  };

  const totalSpent = toursCompleted * TICKET_COST_PER_TOUR;
  const totalLootValue = inventory.reduce((sum, item) => sum + item.price, 0);
  const netProfit = totalLootValue - totalSpent;
  const roiPercentage =
    totalSpent > 0 ? (totalLootValue / totalSpent) * 100 : 0;

  return {
    tours: tourHistory,
    inventory,
    stats: {
      toursCompleted,
      totalSpent,
      totalLootValue,
      netProfit,
      roiPercentage,
    },
    runSimulation,
    resetSimulation,
  };
}
