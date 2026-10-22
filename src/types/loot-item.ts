import type { ItemRarity } from "./item-rarity";

export interface LootItem {
  id: string;
  name: string;
  rarity: ItemRarity;
  price: number;
  image?: string;
}
