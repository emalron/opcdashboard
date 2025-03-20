import React, { useState } from "react";
import "./App.css";
import OpcUaDataViewer from "./components/OpcUaDataViewer";

function App() {
  const [serverId, setServerId] = useState(1);
  const [namespace, setNamespace] = useState(3);
  const [nodeId, setNodeId] = useState('d2507506-a200-4fd7-89a9-94a156ba1584');

  return (
    <div className="App">
      <h1 className="text-5xl! text-lg font-black text-title dark:text-title-dark mb-4">
        OPC UA <span className="text-5xl font-thin">Dashboard</span>
      </h1>
      <div>
        <div className="flex items-center p-3 bg-gray-50 rounded-sm border border-gray-200 gap-4 flex-wrap">
          <label className="flex gap-2 items-center">
            <span className="text-base text-gray-500 font-light">Server ID</span>
            <input
              type="number"
              className="text-gray-900 font-semibold border border-gray-300 p-1 rounded-sm bg-white"
              value={serverId}
              onChange={(e) => setServerId(Number(e.target.value))}
              min="1"
            />
          </label>
          <label className="flex gap-2 items-center">
            <span className="text-neutral-500 font-light">Namespace</span>
            <input
              type="number"
              className="bg-white text-neutral-950 font-semibold border border-gray-300 p-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-sm"
              value={namespace}
              onChange={(e) => setNamespace(Number(e.target.value))}
              min="0"
            />
          </label>
          <label className="flex gap-2 items-center">
            <span className="text-neutral-500 font-light">NodeId</span>
            <input
              type="text"
              className="bg-white text-neutral-950 font-semibold border border-gray-300 p-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-sm"
              value={nodeId}
              onChange={(e) => setNodeId(e.target.value)}
            />
          </label>
        </div>
        <OpcUaDataViewer serverId={serverId} namespace={namespace} nodeId={nodeId} />
      </div>
    </div>
  );
}

export default App;
