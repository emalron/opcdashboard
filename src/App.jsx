import React, { useState } from "react";
import "./App.css";
import OpcUaDataViewer from "./components/OpcUaDataViewer";

function App() {
  const [serverId, setServerId] = useState(1);

  return (
    <div className="App">
      <h1 className="text-5xl! text-lg font-black text-title dark:text-title-dark border-b-1 pb-4 mb-4">
        OPC UA <span className="text-5xl font-thin">Dashboard</span>
      </h1>
      <div>
        <label className="flex items-center p-3 bg-gray-50 rounded-sm border border-gray-200">
          <span className="text-base text-gray-500 font-light">Server ID</span>
          <input
            type="number"
            className="text-gray-900 font-semibold border border-gray-300 p-1 rounded-sm ml-2 bg-white"
            value={serverId}
            onChange={(e) => setServerId(Number(e.target.value))}
            min="1"
          />
        </label>
        <OpcUaDataViewer serverId={serverId} />
      </div>
    </div>
  );
}

export default App;
