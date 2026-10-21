import type { ItemRarity } from "./item-rarity";

export interface LootItem {
  id: string;
  name: string;
  rarity: ItemRarity;
  price: number;
  image?: string;
}

export function robotPartsCommon(quantity: number): LootItem {
  return {
    id: "robot_parts_common",
    name: `Robot Parts x${quantity}`,
    rarity: "common",
    price: 0.04 * quantity,
  };
}

export function robotPartsPristine(quantity: number): LootItem {
  return {
    id: "robot_parts_pristine",
    name: `Pristine Parts x${quantity}`,
    rarity: "uncommon",
    price: 0.11 * quantity,
  };
}

export function basicKit(price: number): LootItem {
  return {
    id: "killstreak_kit",
    name: "Killstreak Kit",
    rarity: "common",
    price: price,
  };
}

export function specFab(wepName: string, price: number): LootItem {
  return {
    id: `spec_fab_${wepName.toLowerCase().replace(/\s+/g, "_")}`,
    name: `Specialized Killstreak ${wepName} Kit`,
    rarity: "uncommon",
    price: price,
    image:
      "https://wiki.teamfortress.com/w/images/thumb/c/cc/Backpack_Specialized_Killstreak_Kit_Fabricator.png/135px-Backpack_Specialized_Killstreak_Kit_Fabricator.png",
  };
}

export function proFab(wepName: string, price: number): LootItem {
  return {
    id: `pro_fab_${wepName.toLowerCase().replace(/\s+/g, "_")}`,
    name: `Professional Killstreak ${wepName} Kit`,
    rarity: "rare",
    price: price,
    image:
      "https://wiki.teamfortress.com/w/images/thumb/b/bf/Backpack_Professional_Killstreak_Kit_Fabricator.png/135px-Backpack_Professional_Killstreak_Kit_Fabricator.png",
  };
}
