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

      {tours.map((tour) => (
        <TourSummaryCard tourRewards={tour} />
      ))}
    </div>
  );
}

export default App;
