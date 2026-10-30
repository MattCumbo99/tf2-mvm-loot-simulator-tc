import type { SimulationStats } from "../../types/simulation-stats";
import { getDetailedTimeBreakdown } from "../../utils/time-util";
import { StatRow } from "./StatRow/StatRow";
import { StatRowTour } from "./StatRowTour/StatRowTour";
import "./StatsView.css";

interface StatsViewProps {
  stats: SimulationStats;
}

export function StatsView({ stats }: StatsViewProps) {
  return (
    <div className="stats-container">
      <StatRow
        name="Tours Completed"
        value={stats.toursCompleted.toLocaleString()}
      />

      <StatRow name="Money Spent" value={`$${stats.totalSpent.toFixed(2)}`} />

      <StatRow
        name="Total Playtime"
        value={getDetailedTimeBreakdown(stats.toursCompleted * 2.1)}
      />

      <StatRow
        name="Loot Value"
        value={`$${stats.totalLootValue.toFixed(2)}`}
      />

      <StatRow
        name="Golden Pans Received"
        value={stats.panCount.toLocaleString()}
      />

      <StatRow name="Tour Number of First Pan" value="(Insufficient Data)" />

      <StatRow
        name="Net Profit / Loss"
        value={`$${stats.netProfit.toFixed(2)}`}
      />

      <StatRow name="Robot Parts Collected" value="0" />

      <StatRow name="Specialized Fabricators Earned" value="0" />

      <StatRow name="Professional Fabricators Earned" value="0" />

      <StatRow name="Australiums Earned" value="0" />

      <StatRowTour
        name="Most Profitable Tour (excluding pans)"
        tourData={stats.mostProfitableTour}
      />

      <StatRowTour
        name="Least Profitable Tour"
        tourData={stats.leastProfitableTour}
      />
    </div>
  );
}
