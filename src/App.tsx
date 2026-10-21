import "./App.css";
import { LootItemCard } from "./components/LootItemCard/LootItemCard";
import { StatsBar } from "./components/StatsBar/StatsBar";
import { TourSummaryCard } from "./components/TourSummaryCard/TourSummaryCard";
import { useMvmSimulator } from "./hooks/use-mvm-simulator";

function App() {
  const { tours, inventory, stats, runSimulation, resetSimulation } =
    useMvmSimulator();

  const highValueItems = () => {
    return inventory
      .filter((item) => item.price >= 10)
      .sort((item1, item2) => (item1.price > item2.price ? 0 : 1));
  };

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
            <h2>High Value Items</h2>
            <span className="valuables-count">{highValueItems().length}</span>
          </div>

          <div className="valuables-scroll-area">
            {highValueItems().map((item) => (
              <LootItemCard item={item} />
            ))}
          </div>
        </div>
      </div>

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
