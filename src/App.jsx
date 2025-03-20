import React, { useState } from "react";
import "./App.css";
import OpcUaDataViewer from "./components/OpcUaDataViewer";
import OpcRootNodeForm from "./components/OpcRootNodeForm";
import { OpcProvider } from "./components/OpcContext";

function App() {

  return (
    <div className="App">
      <h1 className="text-5xl! text-lg font-black text-title dark:text-title-dark mb-4">
        OPC UA <span className="text-5xl font-thin">Dashboard</span>
      </h1>
      <div>
        <OpcProvider>
          <OpcRootNodeForm />
          <OpcUaDataViewer />
        </OpcProvider>
      </div>
    </div>
  );
}

export default App;
