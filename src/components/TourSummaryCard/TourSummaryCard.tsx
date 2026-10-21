import type React from "react";
import type { TourLoot } from "../../types/tour-loot";
import "./TourSummaryCard.css";
import { LootItemCard } from "../LootItemCard/LootItemCard";
import {
  basicKit,
  robotPartsCommon,
  robotPartsPristine,
} from "../../types/loot-item";

interface Props {
  tourRewards: TourLoot;
}

export const TourSummaryCard: React.FC<Props> = ({ tourRewards }) => {
  const roboPartItem = robotPartsCommon(tourRewards.robotParts.common);
  const hasPristineParts = tourRewards.robotParts.rare > 0;

  return (
    <div className="tour-loot-container">
      <LootItemCard item={roboPartItem} />

      {hasPristineParts && (
        <LootItemCard item={robotPartsPristine(tourRewards.robotParts.rare)} />
      )}

      <LootItemCard item={basicKit(tourRewards.basicKitPrice)} />

      <LootItemCard item={tourRewards.specFabricator} />

      {/* Any additional fabricators earned */}
      {tourRewards.additionalSpecFabs.map((fab) => (
        <LootItemCard item={fab} />
      ))}

      {tourRewards.proFabricator && (
        <LootItemCard item={tourRewards.proFabricator} />
      )}

      {tourRewards.australium && <LootItemCard item={tourRewards.australium} />}
    </div>
  );
};
