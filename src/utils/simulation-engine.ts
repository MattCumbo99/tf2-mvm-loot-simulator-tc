import { AUSTRALIUMS, GOLDEN_PAN, WEAPON_REGISTRY } from "../data/loot-tables";
import { proFab, specFab, type LootItem } from "../types/loot-item";
import type { TourLoot } from "../types/tour-loot";
import { TIER_PRICES, type WeaponDefinition } from "../types/weapon-tiers";

/**
 * Simulates the completion of a tour and generates the resulting loot.
 *
 * @returns The generated tour loot.
 */
export function simulateTourCompletion(): TourLoot {
  return {
    basicKitPrice: random(0.07, 0.6),
    specFabricator: randomSpecKit(),
    proFabricator: gambleProKit(),
    australium: gambleAustralium(),
    robotParts: {
      common: random(24, 31),
      rare: calculatePristineParts(),
    },
    additionalSpecFabs: gambleAdditionalSpecFabs(),
  };
}

function calculatePristineParts(): number {
  const pristineChance = random(1, 16);

  if (pristineChance % 4 === 0) {
    return pristineChance / 4;
  }

  return 0;
}

function gambleAdditionalSpecFabs(): LootItem[] {
  const specFabChance = random(1, 40);

  if (specFabChance % 10 === 0) {
    const additionalFabs: LootItem[] = [];
    const fabAmount = specFabChance / 10;

    for (let i = 0; i < fabAmount; i++) {
      additionalFabs.push(randomSpecKit());
    }

    return additionalFabs;
  }

  return [];
}

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomWeapon(): WeaponDefinition {
  return WEAPON_REGISTRY.at(random(0, WEAPON_REGISTRY.length - 1))!!;
}

function randomSpecKit(): LootItem {
  const chosenWeapon = randomWeapon();
  const specPrice = chosenWeapon.customSpecPrice
    ? chosenWeapon.customSpecPrice
    : TIER_PRICES[chosenWeapon.tier].specPrice;

  return specFab(chosenWeapon.name, specPrice);
}

/**
 * Randomly determines if the player has earned a Professional Killstreak Kit.
 * The chance of earning a Professional Killstreak Kit is 15%.
 *
 * @returns The earned Professional Killstreak Kit, or null if not earned.
 */
function gambleProKit(): LootItem | null {
  const hasEarnedProKit = random(1, 100) >= 85;
  if (hasEarnedProKit) {
    return randomProKit();
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

function randomProKit(): LootItem {
  const chosenWeapon = randomWeapon();
  const proPrice = chosenWeapon.customProPrice
    ? chosenWeapon.customProPrice
    : TIER_PRICES[chosenWeapon.tier].proPrice;

  return proFab(chosenWeapon.name, proPrice);
}
