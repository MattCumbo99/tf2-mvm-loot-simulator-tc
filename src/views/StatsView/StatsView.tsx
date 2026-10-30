import type { SimulationStats } from "../../types/simulation-stats";
import { formatCurrency } from "../../utils/currency-util";
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

      <StatRow name="Money Spent" value={formatCurrency(stats.totalSpent)} />

      <StatRow
        name="Total Playtime"
        value={getDetailedTimeBreakdown(stats.toursCompleted * 2.1)}
      />

      <StatRow name="Loot Value" value={formatCurrency(stats.totalLootValue)} />

      <StatRow
        name="Golden Pans Received"
        value={stats.panCount.toLocaleString()}
      />

      <StatRow
        name="Tour Number of First Pan"
        value={stats.firstPanTourNum?.toLocaleString()}
      />

      <StatRow
        name="Net Profit / Loss"
        value={formatCurrency(stats.netProfit)}
      />

      <StatRow
        name="Robot Parts Collected"
        value={stats.totalRobotParts.toLocaleString()}
      />

      <StatRow
        name="Specialized Fabricators Earned"
        value={stats.totalSpecFabs.toLocaleString()}
      />

      <StatRow
        name="Professional Fabricators Earned"
        value={stats.totalProFabs.toLocaleString()}
      />

      <StatRow
        name="Australiums Earned"
        value={stats.totalAustraliums.toLocaleString()}
      />

      <StatRowTour
        name="Most Profitable Tour (excluding pans)"
        tourData={stats.bestTour}
      />

      <StatRowTour
        name="Least Profitable Tour"
        tourData={stats.leastProfitableTour}
      />
    </div>
  );
}
