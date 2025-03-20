import React, {useState} from 'react';
import { OpcProvider, useOpc } from './OpcContext';
import OpcTypeToggle from './OpcTypeToggle';

const NodeIdDisplay = () => {
    const { formattedNodeId } = useOpc();

    return (
        <div className='p-4 bg-white border border-gray-200 rounded-md'>
            <h2 className='text-lg font-medium mb-3'>Root Node</h2>
            <div className='mb-4 p-3 bg-gray-50 rounded border border-gray-300'>
                <span className='font-mono'>{formattedNodeId || 'enter root node id'}</span>
            </div>
            <div className='text-sm text-gray-600 mb-2'>
                Format: <code className='bg-gray-100 px-1 py-0.5 rounded'>ns={namespace};{type}={nodeId}</code>
            </div>
        </div>
    );
};

const OpcRootNodeForm = () => {
    const { serverId, setServerId, namespace, setNamespace, nodeId, setNodeId } = useOpc();

    return (
        <div className="flex items-center p-3 bg-gray-50 rounded-sm border border-gray-200 gap-4 flex-wrap">
            <label className="flex gap-2 items-center">
                <span className="text-base text-gray-500 font-light">Server ID</span>
                <input
                    type="number"
                    className="text-gray-900 font-semibold border border-gray-300 p-1 rounded-sm bg-white"
                    value={serverId}
                    onChange={(e) => setServerId(Number(e.target.value))}
                    min="1"/>
            </label>
            <label className="flex gap-2 items-center">
                <span className="text-neutral-500 font-light">Namespace</span>
                <input
                    type="number"
                    className="bg-white text-neutral-950 font-semibold border border-gray-300 p-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-sm"
                    value={namespace}
                    onChange={(e) => setNamespace(Number(e.target.value))}
                    min="0"/>
            </label>
            <OpcTypeToggle />
            <label className="flex gap-2 items-center">
                <span className="text-neutral-500 font-light">NodeId</span>
                <input
                    type="text"
                    className="bg-white text-neutral-950 font-semibold border border-gray-300 p-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-sm"
                    value={nodeId}
                    onChange={(e) => setNodeId(e.target.value)}/>
            </label>
        </div>
    );
}

export default OpcRootNodeForm;