import { useState } from "react";
import type { LootItem } from "../types/loot-item";
import { simulateTourCompletion } from "../utils/simulation-engine";
import type { MvmSimulator } from "../types/mvm-simuator";
import {
  basicKit,
  GOLDEN_PAN,
  robotPartsCommon,
  robotPartsPristine,
} from "../data/loot-tables";
import type { MvmTour } from "../types/mvm-tour";

const TICKET_COST_PER_TOUR = 0.99 * 4;

export function useMvmSimulator(): MvmSimulator {
  const [australiums, setAustraliums] = useState<LootItem[]>([]);
  const [highValueFabs, setHighValueFabs] = useState<LootItem[]>([]);
  const [tourHistory, setTourHistory] = useState<MvmTour[]>([]);
  const [panCount, setPanCount] = useState(0);
  const [totalLootValue, setTotalLootValue] = useState(0);

  const [specFabCount, setSpecFabCount] = useState(0);
  const [proFabCount, setProFabCount] = useState(0);
  const [roboPartCount, setRoboPartCount] = useState(0);

  const [bestTour, setBestTour] = useState<MvmTour>();
  const [worstTour, setWorstTour] = useState<MvmTour>();

  const resetSimulation = () => {
    setAustraliums([]);
    setHighValueFabs([]);
    setTourHistory([]);
    setPanCount(0);
    setTotalLootValue(0);
    setSpecFabCount(0);
    setProFabCount(0);
    setRoboPartCount(0);
    setBestTour(undefined);
    setWorstTour(undefined);
  };

  const runSimulation = (count: number) => {
    const newDrops: LootItem[] = [];
    const curTourHistory: MvmTour[] = [];
    const curHighValueFabs: LootItem[] = [];
    const curAustraliums: LootItem[] = [];

    let curPanCount = 0;
    let curSpecFabCount = 0;
    let curProFabCount = 0;
    let curRoboPartCount = 0;
    let curTourNumber = tourHistory.length + 1;

    let curBestTour: MvmTour | undefined = bestTour;
    let curWorstTour: MvmTour | undefined = worstTour;

    for (let i = 0; i < count; i++) {
      const currentDrops: LootItem[] = [];

      // Run a tour simulation and record it in the current history
      const tourLoot = simulateTourCompletion();

      const roboParts = tourLoot.robotParts;

      // Add the guaranteed robot parts to the drops
      const roboPartsCommonItem = robotPartsCommon(roboParts.common);
      currentDrops.push(roboPartsCommonItem);
      curRoboPartCount += roboParts.common;

      // Add pristine parts if earned
      if (roboParts.rare > 0) {
        const roboPartsPristineItem = robotPartsPristine(roboParts.rare);
        currentDrops.push(roboPartsPristineItem);
        curRoboPartCount += roboParts.rare;
      }

      // Add the guaranteed normal killstreak kit earned to the drops
      const basicKitItem = basicKit(tourLoot.basicKitPrice);
      currentDrops.push(basicKitItem);

      // Add guaranteed spec fabricator
      currentDrops.push(tourLoot.specFabricator);
      curSpecFabCount++;

      // Add additional spec fabricators earned
      tourLoot.additionalSpecFabs.forEach((fab) => {
        currentDrops.push(fab);
        curSpecFabCount++;
      });

      // Check if this tour earned a pro fabricator
      const earnedProFab = tourLoot.proFabricator;
      if (earnedProFab) {
        // Check if this professional kit is high value
        if (earnedProFab.price >= 10) {
          curHighValueFabs.push(earnedProFab);
        }

        currentDrops.push(earnedProFab);
        curProFabCount++;
      }

      // Check for earned australium
      const earnedAustralium = tourLoot.australium;
      if (earnedAustralium) {
        if (earnedAustralium === GOLDEN_PAN) {
          curPanCount += 1;
        }

        curAustraliums.push(earnedAustralium);
        currentDrops.push(earnedAustralium);
      }

      const currentTour: MvmTour = {
        tourNumber: curTourNumber++,
        tourEarnings: getLootValue(currentDrops),
        tourLoot,
      };

      // Adjust min and max tour stats
      const isBestTour =
        !curBestTour || curBestTour.tourEarnings < currentTour.tourEarnings;
      if (isBestTour) {
        curBestTour = currentTour;
      }

      const isWorstTour =
        !curWorstTour || curWorstTour.tourEarnings > currentTour.tourEarnings;
      if (isWorstTour) {
        curWorstTour = currentTour;
      }

      // Append the drop data to the total tracker
      newDrops.push(...currentDrops);
      curTourHistory.push(currentTour);
    }

    // Write to each state after the simulations complete
    setTourHistory((prev) => [...curTourHistory, ...prev]);
    setTotalLootValue((prev) => prev + getLootValue(newDrops));
    setPanCount((prev) => prev + curPanCount);
    setRoboPartCount((prev) => prev + curRoboPartCount);
    setSpecFabCount((prev) => prev + curSpecFabCount);
    setProFabCount((prev) => prev + curProFabCount);
    setBestTour(curBestTour);
    setWorstTour(curWorstTour);

    if (curHighValueFabs.length > 0) {
      setHighValueFabs((prev) => [...curHighValueFabs, ...prev]);
    }

    if (curAustraliums.length > 0) {
      setAustraliums((prev) => [...curAustraliums, ...prev]);
    }
  };

  const totalSpent = tourHistory.length * TICKET_COST_PER_TOUR;
  const netProfit = totalLootValue - totalSpent;
  const roiPercentage =
    totalSpent > 0 ? (totalLootValue / totalSpent) * 100 : 0;

  return {
    tours: tourHistory,
    australiums,
    highValueFabs,
    stats: {
      toursCompleted: tourHistory.length,
      totalSpent,
      totalLootValue,
      netProfit,
      panCount,
      roiPercentage,
      australiumCount: australiums.length,
      totalRobotParts: roboPartCount,
      specFabCount,
      proFabCount,
      mostProfitableTour: bestTour,
      leastProfitableTour: worstTour,
    },
    runSimulation,
    resetSimulation,
  };
}

function getLootValue(items: LootItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
