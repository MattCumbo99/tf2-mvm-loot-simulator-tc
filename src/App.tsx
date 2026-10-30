import { useEffect, useState } from "react";
import "./App.css";
import { SimulatorView } from "./views/SimulatorView/SimulatorView";
import { type ActiveTab, NavBar } from "./components/NavBar/NavBar";
import { StatsView } from "./views/StatsView/StatsView";
import { useMvmSimulator } from "./hooks/use-mvm-simulator";

function App() {
  useEffect(() => {
    document.title = "Two Cities Loot Simulator";
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>("simulator");
  const simulator = useMvmSimulator();

  return (
    <div>
      <NavBar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="app-content">
        {activeTab === "simulator" ? (
          <SimulatorView simulator={simulator} />
        ) : (
          <StatsView stats={simulator.stats} />
        )}
      </main>
    </div>
  );
}

export default App;
