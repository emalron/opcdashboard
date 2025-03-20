import React, { createContext, useState, useContext, useMemo } from 'react';

const OpcContext = createContext(null);

export function OpcProvider({ children }) {
    // 모든 OPC UA 파라미터 상태 관리
    const [isNumber, setIsNumber] = useState(false);
    const [namespace, setNamespace] = useState(0);
    const [nodeId, setNodeId] = useState('85');
    const [serverId, setServerId] = useState(1);

    // 타입 값 계산 ('s' = String, 'i' = Number)
    const typeValue = isNumber ? 'i' : 's';

    const formattedNodeId = nodeId ? 
        `ns=${namespace};${typeValue}=${nodeId}` :
        '';
    
    // 성능 최적화를 위한 Context 값 메모이제이션
    const value = useMemo(() => ({
        // 상태값
        serverId,
        namespace,
        nodeId,
        isNumber,
        typeValue,
        formattedNodeId,

        setServerId,
        setNamespace,
        setNodeId,
        setIsNumber,
        toggleType: () => setIsNumber(prev => !prev)
    }), [serverId, namespace, nodeId, isNumber]);

    return (
        <OpcContext.Provider value={value}>
            {children}
        </OpcContext.Provider>
    );
}

export function useOpc() {
    const context = useContext(OpcContext);

    if(context === undefined || context === null) {
        throw new Error('useOpc must be used within an OpcProvider');
    }

    return context;
}