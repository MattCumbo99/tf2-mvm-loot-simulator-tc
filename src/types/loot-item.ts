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
    name: `Robot Parts: x${quantity}`,
    rarity: "common",
    price: 0.04 * quantity,
    image: "/items/robot_part.png",
  };
}

export function robotPartsPristine(quantity: number): LootItem {
  return {
    id: "robot_parts_pristine",
    name: `Pristine Parts: x${quantity}`,
    rarity: "uncommon",
    price: 0.11 * quantity,
    image: "/items/pristine_part.png",
  };
}

export function basicKit(price: number): LootItem {
  return {
    id: "killstreak_kit",
    name: "Killstreak Kit",
    rarity: "common",
    price: price,
    image: "/items/killstreak_kit.png",
  };
}

export function specFab(wepName: string, price: number): LootItem {
  return {
    id: `spec_fab_${wepName.toLowerCase().replace(/\s+/g, "_")}`,
    name: `Specialized Killstreak ${wepName} Kit Fabricator`,
    rarity: "uncommon",
    price: price,
    image: "/items/spec_kit_fabricator.png",
  };
}

export function proFab(wepName: string, price: number): LootItem {
  return {
    id: `pro_fab_${wepName.toLowerCase().replace(/\s+/g, "_")}`,
    name: `Professional Killstreak ${wepName} Kit Fabricator`,
    rarity: "rare",
    price: price,
    image: "/items/pro_kit_fabricator.png",
  };
}
