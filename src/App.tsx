import { useEffect } from "react";
import "./App.css";
import { SimulatorView } from "./views/SimulatorView/SimulatorView";

function App() {
  useEffect(() => {
    document.title = "TF2 MvM Two Cities Loot Simulator";
  });

  return <SimulatorView />;
}

export default App;
