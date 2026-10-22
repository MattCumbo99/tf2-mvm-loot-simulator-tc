import {
  AUSTRALIUMS,
  GOLDEN_PAN,
  proFab,
  WEAPON_REGISTRY,
} from "../data/loot-tables";
import type { LootItem } from "../types/loot-item";
import type { TourLoot } from "../types/tour-loot";
import type { WeaponDefinition } from "../types/weapon-definition";
import { specFab } from "../data/loot-tables";

/**
 * Simulates the completion of a tour and generates the resulting loot.
 *
 * @returns The generated tour loot.
 */
export function simulateTourCompletion(): TourLoot {
  return {
    basicKitPrice: calculateKitPrice(),
    specFabricator: randomSpecFab(),
    proFabricator: gambleProFab(),
    australium: gambleAustralium(),
    robotParts: {
      common: random(20, 27),
      rare: gamblePristineParts(),
    },
    additionalSpecFabs: gambleAdditionalSpecFabs(),
  };
}

function calculateKitPrice(): number {
  return random(40, 75) * 0.01;
}

/**
 * Rolls for a chance at succeeding four different times.
 *
 * @param chancePerMission Decimal percentage to succeed.
 * @returns Number of successes.
 */
function rollRewards(chancePerMission: number): number {
  const minRoll = 100 - 100 * chancePerMission;
  const missionCount = 4;
  let rewardAmount = 0;

  for (let i = 0; i < missionCount; i++) {
    const roll = random(1, 100);

    if (roll >= minRoll) {
      rewardAmount++;
    }
  }

  return rewardAmount;
}

function gamblePristineParts(): number {
  return rollRewards(0.17);
}

function gambleAdditionalSpecFabs(): LootItem[] {
  const rewardedKits = rollRewards(0.05);

  const specFabs: LootItem[] = [];

  for (let i = 0; i < rewardedKits; i++) {
    specFabs.push(randomSpecFab());
  }

  return specFabs;
}

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomWeapon(): WeaponDefinition {
  return WEAPON_REGISTRY.at(random(0, WEAPON_REGISTRY.length - 1))!!;
}

function randomSpecFab(): LootItem {
  const chosenWeapon = randomWeapon();
  const specFabItem = specFab(chosenWeapon.name, chosenWeapon.specFabPrice);

  adjustSpecFabRarity(specFabItem);

  return specFabItem;
}

/**
 * Randomly determines if the player has earned a Professional Killstreak Kit.
 * The chance of earning a Professional Killstreak Kit is 15%.
 *
 * @returns The earned Professional Killstreak Kit, or null if not earned.
 */
function gambleProFab(): LootItem | null {
  const hasEarnedProKit = random(1, 100) >= 85;
  if (hasEarnedProKit) {
    return randomProFab();
  }

  return null;
}

/**
 * Randomly determines if the player has earned an Australium weapon or the Golden Pan.
 * The chance of earning the Golden Pan is 1 in 19,500, while the chance of earning an Australium weapon is 1 in 100.
 *
 * @returns The earned Australium weapon or Golden Pan, or null if neither was earned.
 */
function gambleAustralium(): LootItem | null {
  const hasEarnedGoldenPan = random(1, 19500) === 19500;
  if (hasEarnedGoldenPan) {
    return GOLDEN_PAN;
  }

  const hasEarnedAustralium = random(1, 100) >= 99;
  if (hasEarnedAustralium) {
    return AUSTRALIUMS.at(random(0, AUSTRALIUMS.length - 1))!!;
  }

  return null;
}

function randomProFab(): LootItem {
  const chosenWeapon = randomWeapon();
  const proFabItem = proFab(chosenWeapon.name, chosenWeapon.proFabPrice);

  adjustProFabRarity(proFabItem);

  return proFabItem;
}

function adjustSpecFabRarity(specFab: LootItem) {
  const uncommonPriceThreshold = 0.1;
  const rarePriceThreshold = 1;

  if (specFab.price >= uncommonPriceThreshold) {
    specFab.rarity = "uncommon";
  }

  if (specFab.price >= rarePriceThreshold) {
    specFab.rarity = "rare";
  }
}

function adjustProFabRarity(proFab: LootItem) {
  const rarePriceThreshold = 5;
  const legendPriceThreshold = 20;

  if (proFab.price >= rarePriceThreshold) {
    proFab.rarity = "rare";
  }

  if (proFab.price >= legendPriceThreshold) {
    proFab.rarity = "legendary";
  }
}
