import React from "react";
import type { SimulationStats } from "../../types/simulation-stats";
import "./StatsBar.css";

interface Props {
  stats: SimulationStats;
  onSimulate: (count: number) => void;
  onReset: () => void;
}

export const StatsBar: React.FC<Props> = ({ stats, onSimulate, onReset }) => {
  const isProfitable = stats.netProfit >= 0;

  return (
    <div className="stats-bar">
      <div className="stat-card">
        <label>Tours Completed</label>
        <span>{stats.toursCompleted}</span>
      </div>

      <div className="stat-card">
        <label>Total Spent</label>
        <span>${stats.totalSpent.toFixed(2)}</span>
      </div>

      <div className="stat-card">
        <label>Loot Value</label>
        <span>${stats.totalLootValue.toFixed(2)}</span>
      </div>

      <div className={`stat-card ${isProfitable ? "profit" : "loss"}`}>
        <label>Net Profit / Loss</label>
        <span>
          {isProfitable ? "+" : "-"}${Math.abs(stats.netProfit).toFixed(2)}
        </span>
      </div>

      <div className={`stat-card ${isProfitable ? "profit" : "loss"}`}>
        <label>Returns on Interest</label>
        <span>{stats.roiPercentage.toFixed(1)}%</span>
      </div>

      <div className="actions">
        <button onClick={() => onSimulate(1)}>+1 Tour</button>
        <button onClick={() => onSimulate(10)}>+10 Tours</button>
        <button onClick={() => onSimulate(100)}>+100 Tours</button>
        <button className="reset-btn" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
};
