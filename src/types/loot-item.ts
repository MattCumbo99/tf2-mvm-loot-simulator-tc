import type { ItemRarity } from "./item-rarity";
import type { Killstreaker, WeaponSheen } from "./killstreak-effects";

export interface LootItem {
  id: string;
  name: string;
  rarity: ItemRarity;
  price: number;
  image?: string;
  sheen?: WeaponSheen;
  killstreaker?: Killstreaker;
}
