import React, { useState } from "react";

const OpcConnector = ({ serverUrl, setServerUrl, setOpcConnected }) => {
  const [opcUrl, setOpcUrl] = useState("opc.tcp://192.168.0.3:19800/ISP/JISP-Server");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResponse('');

    try {
      const opcHost = { url: opcUrl };
      const url = `${serverUrl}/init`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(opcHost),
      });

      if (!response.ok) throw new Error(`Error sendMessage: ${response.status}`);

      const data = await response.json();
      setResponse(JSON.stringify(data, null, 2));
      if (data.result) {
        setOpcConnected(true);
      } else {
        setOpcConnected(false);
      }
    } catch (err) {
      setError(`${err.message}`);
      setOpcConnected(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded border border-gray-300 w-full">
      <form onSubmit={sendMessage}>
        <div className="mb-4">
          <label className="block text-base text-gray-500 font-light mb-1">HOST</label>
          <input type="text" value="http://localhost:8080" onChange={(e) => setServerUrl(e.target.value)} className="w-full p-2 border rounded-sm border-gray-300" required />
        </div>
        <div className="mb-4">
          <label className="block text-base text-gray-500 font-light mb-1">OPC-UA</label>
          <input type="text" value="opc.tcp://192.168.0.3:19800/ISP/JISP-Server" onChange={(e) => setOpcUrl(e.target.value)} className="w-full p-2 border rounded-sm border-gray-300" required />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-gray-800! text-white p-2 rounded-sm! hover:bg-blue-600! disabled:bg-gray-400!">
          {loading ? "전송 중..." : "전송"}
        </button>
      </form>

      {error && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">서버 응답:</h3>
          <pre className="bg-gray-100 p-3 rounded overflow-x-auto">{response}</pre>
        </div>
      )}
    </div>
  );
};

export default OpcConnector;
