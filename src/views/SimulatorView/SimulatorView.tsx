import { LootItemCard } from "../../components/LootItemCard/LootItemCard";
import { StatsBar } from "../../components/StatsBar/StatsBar";
import { TourSummaryCard } from "../../components/TourSummaryCard/TourSummaryCard";
import type { MvmSimulator } from "../../types/mvm-simuator";
import "./SimulatorView.css";

interface SimulatorViewProps {
  simulator: MvmSimulator;
}

export function SimulatorView({ simulator }: SimulatorViewProps) {
  return (
    <div className="simulator-container">
      <header className="simulator-header">
        <h1 className="simulator-title">
          <span className="title-highlight">MvM</span> Two Cities Loot Simulator
        </h1>
        <p className="simulator-subtitle">
          Operation Two Cities • Tour Completion & ROI Tracker
        </p>
      </header>

      <div className="top-dashboard-container">
        <div className="stats-panel">
          <StatsBar
            stats={simulator.stats}
            onSimulate={simulator.runSimulation}
            onReset={simulator.resetSimulation}
          />
        </div>

        <div className="valuables-panel">
          <div className="valuables-panel-header">
            <h2>Valuable Fabricators</h2>
            <span className="valuables-count">
              {simulator.highValueFabs.length}
            </span>
          </div>

          <div className="valuables-scroll-area">
            {simulator.highValueFabs.slice(0, 20).map((item) => (
              <LootItemCard item={item} />
            ))}
          </div>
        </div>

        <div className="valuables-panel">
          <div className="valuables-panel-header">
            <h2>Australiums</h2>
            <span className="valuables-count">
              {simulator.australiums.length}
            </span>
          </div>

          <div className="valuables-scroll-area">
            {simulator.australiums.slice(0, 50).map((item) => (
              <LootItemCard item={item} />
            ))}
          </div>
        </div>
      </div>

      <div className="tour-history-list">
        {simulator.tours.slice(0, 50).map((tour) => (
          <TourSummaryCard tour={tour} />
        ))}
      </div>
    </div>
  );
}
