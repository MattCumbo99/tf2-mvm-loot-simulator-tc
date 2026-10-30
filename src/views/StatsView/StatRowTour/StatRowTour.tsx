import { useState } from "react";
import { TourSummaryCard } from "../../../components/TourSummaryCard/TourSummaryCard";
import "./StatRowTour.css";
import type { MvmTour } from "../../../types/mvm-tour";

interface StatRowTourProps {
  name: string;
  tourData?: MvmTour;
}

export function StatRowTour({ name, tourData }: StatRowTourProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasData = Boolean(tourData);

  const handleToggle = () => {
    if (hasData) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div
      className={`stat-row-tour ${!hasData ? "stat-row-tour-disabled" : ""}`}
    >
      {/* Main Row Header */}
      <div
        className="stat-row-tour-header"
        onClick={handleToggle}
        role="button"
        tabIndex={hasData ? 0 : -1}
      >
        <span className="stat-row-tour-label">{name}</span>

        <div className="stat-row-tour-right">
          <span
            className={`stat-row-tour-status ${!hasData ? "insufficient" : "clickable"}`}
          >
            {hasData
              ? isOpen
                ? "Click to Collapse"
                : "Click to Expand"
              : "(Insufficient Data)"}
          </span>
          {hasData && <span className="arrow">{isOpen ? "▲" : "▼"}</span>}
        </div>
      </div>

      {/* Expandable Content Area */}
      {isOpen && hasData && tourData && (
        <div className="stat-row-tour-expansion">
          <TourSummaryCard tour={tourData} />
        </div>
      )}
    </div>
  );
}
