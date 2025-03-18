import React, { useState } from "react";
import "./App.css";
import OpcUaDataViewer from "./components/OpcUaDataViewer";

function App() {
  const [serverId, setServerId] = useState(1);
  const [namespace, setNamespace] = useState(0);
  const [nodeId, setNodeId] = useState(85);

  return (
    <div className="App">
      <h1 className="text-5xl! text-lg font-black text-title dark:text-title-dark border-b-1 pb-4 mb-4">
        OPC UA <span className="text-5xl font-thin">Dashboard</span>
      </h1>
      <div>
        <label className="mr-4">
          <span className="text-neutral-500 font-light">Server ID</span>
          <input
            type="number"
            className="text-neutral-950 font-semibold border border-gray-300 p-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-sm ml-2"
            value={serverId}
            onChange={(e) => setServerId(Number(e.target.value))}
            min="1"
          />
        </label>
        <label className="mr-4">
          <span className="text-neutral-500 font-light">Namespace</span>
          <input
            type="number"
            className="text-neutral-950 font-semibold border border-gray-300 p-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-sm ml-2"
            value={namespace}
            onChange={(e) => setNamespace(Number(e.target.value))}
            min="0"
          />
        </label>
        <label className="mr-4">
          <span className="text-neutral-500 font-light">NodeId</span>
          <input
            type="number"
            className="text-neutral-950 font-semibold border border-gray-300 p-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-sm ml-2"
            value={nodeId}
            onChange={(e) => setNodeId(Number(e.target.value))}
            min="1"
          />
        </label>
        <OpcUaDataViewer serverId={serverId} namespace={namespace} nodeId={nodeId} />
      </div>
    </div>
  );
}

export default App;
