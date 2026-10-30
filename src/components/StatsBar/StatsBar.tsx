import React from "react";
import type { SimulationStats } from "../../types/simulation-stats";
import "./StatsBar.css";
import { getDetailedTimeBreakdown } from "../../utils/time-util";
import { formatCurrency } from "../../utils/currency-util";

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
        <span>{stats.toursCompleted.toLocaleString()}</span>
      </div>

      <div className="stat-card">
        <label>Money Spent</label>
        <span>{formatCurrency(stats.totalSpent)}</span>
      </div>

      <div className="stat-card">
        <label>Hours Played</label>

        <div className="stat-card-details">
          <span className="stat-value">
            {(stats.toursCompleted * 2.1).toLocaleString()}
          </span>
          <span className="stat-subtitle">
            {getDetailedTimeBreakdown(stats.toursCompleted * 2.1)}
          </span>
        </div>
      </div>

      <div className="stat-card">
        <label>Loot Value</label>
        <span>{formatCurrency(stats.totalLootValue)}</span>
      </div>

      <div className="stat-card">
        <label>Golden Pans</label>
        <span>{stats.panCount.toLocaleString()}</span>
      </div>

      <div className={`stat-card ${isProfitable ? "profit" : "loss"}`}>
        <label>Net Profit / Loss</label>
        <span>{formatCurrency(stats.netProfit)}</span>
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
