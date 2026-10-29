import { useState } from "react";
import type { LootItem } from "../types/loot-item";
import { simulateTourCompletion } from "../utils/simulation-engine";
import type { MvmSimulator } from "../types/mvm-simuator";
import type { TourLoot } from "../types/tour-loot";
import {
  basicKit,
  GOLDEN_PAN,
  robotPartsCommon,
  robotPartsPristine,
} from "../data/loot-tables";

const TICKET_COST_PER_TOUR = 0.99 * 4;

export function useMvmSimulator(): MvmSimulator {
  const [australiums, setAustraliums] = useState<LootItem[]>([]);
  const [highValueFabs, setHighValueFabs] = useState<LootItem[]>([]);
  const [tourHistory, setTourHistory] = useState<TourLoot[]>([]);
  const [panCount, setPanCount] = useState(0);
  const [toursCompleted, setToursCompleted] = useState(0);
  const [totalLootValue, setTotalLootValue] = useState(0);

  const runSimulation = (count: number) => {
    const newDrops: LootItem[] = [];

    for (let i = 0; i < count; i++) {
      const tourLoot = simulateTourCompletion();

      // Add this tour to the history
      setTourHistory((prev) => [tourLoot, ...prev]);

      newDrops.push(robotPartsCommon(tourLoot.robotParts.common));

      if (tourLoot.robotParts.rare > 0) {
        newDrops.push(robotPartsPristine(tourLoot.robotParts.rare));
      }

      newDrops.push(basicKit(tourLoot.basicKitPrice));

      // Add guaranteed spec fabricator
      newDrops.push(tourLoot.specFabricator);

      tourLoot.additionalSpecFabs.forEach((fab) => newDrops.push(fab));

      const earnedProFab = tourLoot.proFabricator;
      if (earnedProFab) {
        // Check if this professional kit is high value
        if (earnedProFab.price >= 10) {
          setHighValueFabs((prev) => [earnedProFab, ...prev]);
        }

        newDrops.push(earnedProFab);
      }

      const earnedAustralium = tourLoot.australium;
      if (earnedAustralium) {
        if (earnedAustralium === GOLDEN_PAN) {
          alert("You have received The Golden Frying Pan!");
          setPanCount((prev) => prev + 1);
        }

        setAustraliums((prev) => [earnedAustralium, ...prev]);
        newDrops.push(earnedAustralium);
      }
    }

    setTotalLootValue((prev) => prev + getLootValue(newDrops));
    setToursCompleted((prev) => prev + count);
  };

  const resetSimulation = () => {
    setTotalLootValue(0);
    setAustraliums([]);
    setHighValueFabs([]);
    setTourHistory([]);
    setPanCount(0);
    setToursCompleted(0);
  };

  const totalSpent = toursCompleted * TICKET_COST_PER_TOUR;
  const netProfit = totalLootValue - totalSpent;
  const roiPercentage =
    totalSpent > 0 ? (totalLootValue / totalSpent) * 100 : 0;

  return {
    tours: tourHistory,
    australiums,
    highValueFabs,
    stats: {
      toursCompleted,
      totalSpent,
      totalLootValue,
      netProfit,
      panCount,
      roiPercentage,
    },
    runSimulation,
    resetSimulation,
  };
}

function getLootValue(items: LootItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
