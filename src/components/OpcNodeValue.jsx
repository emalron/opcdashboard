import React from "react";

export default function OpcNodeValue({nodeValues}) {
  return (
    <div>
      <h3 className="mt-8 font-bold text-lg">Node Values</h3>
      <table className="data-table table-auto border-collapse w-full mt-2">
        <colgroup>
          <col width="30%" />
          <col width="30%" />
          <col width="40%" />
        </colgroup>
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 bg-gray-100 font-medium text-title border-l-0">Name</th>
            <th className="border border-gray-300 p-2 bg-gray-100 font-medium text-title">Node Id</th>
            <th className="border border-gray-300 p-2 bg-gray-100 font-medium text-title border-r-0">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(nodeValues).map(([nodeId, value]) => (
            <tr key={nodeId}>
              <td className="border border-gray-300 p-2 text-center border-l-0">{value.name}</td>
              <td className="border border-gray-300 p-2 text-center">{nodeId}</td>
              <td className="border border-gray-300 p-2 border-r-0">{value.value ? value.value : 'false'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
