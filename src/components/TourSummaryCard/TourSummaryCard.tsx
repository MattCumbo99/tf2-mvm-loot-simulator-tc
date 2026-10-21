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
  tourNumber: number;
  tourRewards: TourLoot;
}

export const TourSummaryCard: React.FC<Props> = ({
  tourNumber,
  tourRewards,
}) => {
  const roboPartItem = robotPartsCommon(tourRewards.robotParts.common);
  const hasPristineParts = tourRewards.robotParts.rare > 0;

  return (
    <div className="tour-summary-card">
      <div className="tour-card-header">
        <h3 className="tour-number-title">
          Tour <span className="tour-number-highlight">#{tourNumber}</span>
        </h3>
      </div>

      <div className="tour-loot-container">
        <LootItemCard item={roboPartItem} />

        {hasPristineParts && (
          <LootItemCard
            item={robotPartsPristine(tourRewards.robotParts.rare)}
          />
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

        {tourRewards.australium && (
          <LootItemCard item={tourRewards.australium} />
        )}
      </div>
    </div>
  );
};
