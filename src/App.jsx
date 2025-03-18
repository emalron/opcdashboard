import React, {useState} from 'react'
import './App.css'
import OpcUaDataViewer from './components/OpcUaDataViewer'

function App() {
  const [serverId, setServerId] = useState(1);

  return (
    <div className="App">
      <h1>OPC UA Dashboard</h1>
      <div>
        <label>
          Server ID:
          <input
            type="number"
            value={serverId}
            onChange={(e) => setServerId(Number(e.target.value))}
            min="1"
          />
        </label>
        <OpcUaDataViewer serverId={serverId} />
      </div>
    </div>
  )
}

export default App;