import { useState } from "react";
import type { LootItem } from "../types/loot-item";
import { simulateTourCompletion } from "../utils/simulation-engine";
import type { MvmSimulator } from "../types/mvm-simuator";

const TICKET_COST_PER_TOUR = 0.99 * 4;

export function useMvmSimulator(): MvmSimulator {
  const [inventory, setInventory] = useState<LootItem[]>([]);
  const [toursCompleted, setToursCompleted] = useState(0);

  const runSimulation = (count: number) => {
    const newDrops: LootItem[] = [];

    for (let i = 0; i < count; i++) {
      const tourLoot = simulateTourCompletion();

      newDrops.push(killstreakKit(tourLoot.basicKitPrice));

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
    setToursCompleted(0);
  };

  const totalSpent = toursCompleted * TICKET_COST_PER_TOUR;
  const totalLootValue = inventory.reduce((sum, item) => sum + item.price, 0);
  const netProfit = totalLootValue - totalSpent;
  const roiPercentage =
    totalSpent > 0 ? (totalLootValue / totalSpent) * 100 : 0;

  return {
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

function killstreakKit(price: number): LootItem {
  return {
    id: "killstreak_kit",
    name: "Killstreak Kit",
    rarity: "common",
    price: price,
    // TODO: Image
  };
}
