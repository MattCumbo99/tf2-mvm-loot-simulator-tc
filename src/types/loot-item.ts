import type { ItemRarity } from "./item-rarity";

export interface LootItem {
  id: string;
  name: string;
  rarity: ItemRarity;
  price: number;
  image?: string;
}

export function specFab(wepName: string, price: number): LootItem {
  return {
    id: `spec_fab_${wepName.toLowerCase().replace(/\s+/g, "_")}`,
    name: wepName,
    rarity: "uncommon",
    price: price,
    image:
      "https://wiki.teamfortress.com/w/images/thumb/c/cc/Backpack_Specialized_Killstreak_Kit_Fabricator.png/135px-Backpack_Specialized_Killstreak_Kit_Fabricator.png",
  };
}

export function proFab(wepName: string, price: number): LootItem {
  return {
    id: `pro_fab_${wepName.toLowerCase().replace(/\s+/g, "_")}`,
    name: wepName,
    rarity: "rare",
    price: price,
    image:
      "https://wiki.teamfortress.com/w/images/thumb/b/bf/Backpack_Professional_Killstreak_Kit_Fabricator.png/135px-Backpack_Professional_Killstreak_Kit_Fabricator.png",
  };
}
