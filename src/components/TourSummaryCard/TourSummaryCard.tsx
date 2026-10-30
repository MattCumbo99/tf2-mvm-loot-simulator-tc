import "./TourSummaryCard.css";
import { LootItemCard } from "../LootItemCard/LootItemCard";
import { memo } from "react";
import {
  basicKit,
  robotPartsCommon,
  robotPartsPristine,
} from "../../data/loot-tables";
import type { MvmTour } from "../../types/mvm-tour";

interface TourSummaryCardProps {
  tour: MvmTour;
}

function TourSummaryCardComponent({ tour }: TourSummaryCardProps) {
  const tourRewards = tour.tourLoot;
  const roboPartItem = robotPartsCommon(tourRewards.robotParts.common);
  const hasPristineParts = tourRewards.robotParts.rare > 0;

  return (
    <div className="tour-summary-card">
      <div className="tour-card-header">
        <h3 className="tour-number-title">
          Tour <span className="tour-number-highlight">#{tour.tourNumber}</span>
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
}

export const TourSummaryCard = memo(TourSummaryCardComponent);
