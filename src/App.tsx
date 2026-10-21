import "./App.css";
import { StatsBar } from "./components/StatsBar/StatsBar";
import { TourSummaryCard } from "./components/TourSummaryCard/TourSummaryCard";
import { useMvmSimulator } from "./hooks/use-mvm-simulator";

function App() {
  const { tours, inventory, stats, runSimulation, resetSimulation } =
    useMvmSimulator();

  return (
    <div>
      <StatsBar
        stats={stats}
        onSimulate={runSimulation}
        onReset={resetSimulation}
      />

      <div className="tour-history-list">
        {tours.map((tour, index) => (
          <TourSummaryCard
            tourRewards={tour}
            tourNumber={tours.length - index}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
