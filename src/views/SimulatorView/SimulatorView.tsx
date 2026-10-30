import { ItemGroupShowcase } from "../../components/ItemGroupShowcase/ItemGroupShowcase";
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
      <div className="top-dashboard-container">
        <div className="stats-panel">
          <StatsBar
            stats={simulator.stats}
            onSimulate={simulator.runSimulation}
            onReset={simulator.resetSimulation}
          />
        </div>

        <ItemGroupShowcase
          title="Valuable Fabricators"
          items={simulator.highValueFabs}
        />

        <ItemGroupShowcase title="Australiums" items={simulator.australiums} />
      </div>

      <div className="tour-history-list">
        {simulator.tours.slice(0, 50).map((tour) => (
          <TourSummaryCard tour={tour} />
        ))}
      </div>
    </div>
  );
}
