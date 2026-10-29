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
    const curTourHistory: TourLoot[] = [];
    const curHighValueFabs: LootItem[] = [];
    const curAustraliums: LootItem[] = [];

    let curPanCount = 0;

    for (let i = 0; i < count; i++) {
      // Run a tour simulation and record it in the current history
      const tourLoot = simulateTourCompletion();
      curTourHistory.push(tourLoot);

      const roboParts = tourLoot.robotParts;

      // Add the guaranteed robot parts to the drops
      const roboPartsCommonItem = robotPartsCommon(roboParts.common);
      newDrops.push(roboPartsCommonItem);

      // Add pristine parts if earned
      if (roboParts.rare > 0) {
        const roboPartsPristineItem = robotPartsPristine(roboParts.rare);

        newDrops.push(roboPartsPristineItem);
      }

      // Add the guaranteed normal killstreak kit earned to the drops
      const basicKitItem = basicKit(tourLoot.basicKitPrice);
      newDrops.push(basicKitItem);

      // Add guaranteed spec fabricator
      newDrops.push(tourLoot.specFabricator);

      // Add additional spec fabricators earned
      tourLoot.additionalSpecFabs.forEach((fab) => newDrops.push(fab));

      // Check if this tour earned a pro fabricator
      const earnedProFab = tourLoot.proFabricator;
      if (earnedProFab) {
        // Check if this professional kit is high value
        if (earnedProFab.price >= 10) {
          curHighValueFabs.push(earnedProFab);
        }

        newDrops.push(earnedProFab);
      }

      // Check for earned australium
      const earnedAustralium = tourLoot.australium;
      if (earnedAustralium) {
        if (earnedAustralium === GOLDEN_PAN) {
          curPanCount += 1;
        }

        curAustraliums.push(earnedAustralium);
        newDrops.push(earnedAustralium);
      }
    }

    // Write to each state after the simulations complete
    setTourHistory((prev) => [...curTourHistory, ...prev]);
    setTotalLootValue((prev) => prev + getLootValue(newDrops));
    setToursCompleted((prev) => prev + count);
    setPanCount((prev) => prev + curPanCount);

    if (curHighValueFabs.length > 0) {
      setHighValueFabs((prev) => [...curHighValueFabs, ...prev]);
    }

    if (curAustraliums.length > 0) {
      setAustraliums((prev) => [...curAustraliums, ...prev]);
    }
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
