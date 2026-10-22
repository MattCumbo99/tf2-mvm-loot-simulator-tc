import "./App.css";
import { LootItemCard } from "./components/LootItemCard/LootItemCard";
import { StatsBar } from "./components/StatsBar/StatsBar";
import { TourSummaryCard } from "./components/TourSummaryCard/TourSummaryCard";
import { useMvmSimulator } from "./hooks/use-mvm-simulator";

function App() {
  const {
    tours,
    australiums,
    highValueFabs,
    stats,
    runSimulation,
    resetSimulation,
  } = useMvmSimulator();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">
          <span className="title-highlight">MvM</span> Two Cities Loot Simulator
        </h1>
        <p className="app-subtitle">
          Operation Two Cities • Tour Completion & ROI Tracker
        </p>
      </header>

      <div className="top-dashboard-container">
        <div className="stats-panel">
          <StatsBar
            stats={stats}
            onSimulate={runSimulation}
            onReset={resetSimulation}
          />
        </div>

        <div className="valuables-panel">
          <div className="valuables-panel-header">
            <h2>Valuable Fabricators</h2>
            <span className="valuables-count">{highValueFabs.length}</span>
          </div>

          <div className="valuables-scroll-area">
            {highValueFabs.slice(0, 20).map((item) => (
              <LootItemCard item={item} />
            ))}
          </div>
        </div>

        <div className="valuables-panel">
          <div className="valuables-panel-header">
            <h2>Australiums</h2>
            <span className="valuables-count">{australiums.length}</span>
          </div>

          <div className="valuables-scroll-area">
            {australiums.slice(0, 50).map((item) => (
              <LootItemCard item={item} />
            ))}
          </div>
        </div>
      </div>

      <div className="tour-history-list">
        {tours.slice(0, 50).map((tour, index) => (
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
