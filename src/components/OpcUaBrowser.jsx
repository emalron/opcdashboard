import React, {useState, useEffect} from 'react';
import { ChevronRight, ChevronDown, Box, Tag, Database, Grid, Layers, Server, RotateCw, Cable } from 'lucide-react';

const nodeIcons = {
    Object: <Box className="text-blue-600" size={18} />,
    Variable: <Box className="text-green-600" size={18} />,
    Method: <Box className="text-purple-600" size={18} />,
    ObjectType: <Box className="text-orange-500" size={18} />,
    VariableType: <Box className="text-red-500" size={18} />,
    ReferenceType: <Box className="text-cyan-500" size={18} />,
    DataType: <Box className="text-yellow-500" size={18} />,
    View: <Box className="text-gray-500" size={18} />,
};

const TreeNode = ({namespace, node, fetchChildren, serverUrl}) => {
    const [isExpanded, setIsExpanded] =  useState(false);
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(false);

    const toggleExpand = async () => {
        if(!isExpanded && children.length == 0) {
            setLoading(true);
            try {
                const childrenNodes = await fetchChildren(namespace, node.identifier);
                setChildren(childrenNodes.children);
                console.log(childrenNodes)
            } catch(error) {
                console.error(`toggleExpand: ${error}`)
            } finally {
                setLoading(false);
            }
        }
        setIsExpanded(!isExpanded);
    }

    const getNodeIcon = () => {
        return nodeIcons[node.nodeClass] || <Box size={18} />;
    };

    const sendNodeToApi = (namespace, identifier) => {
        console.log(serverUrl)
        fetch(`${serverUrl}/traverse/${namespace}/${identifier}`)
    }

    return (
        <div className="select-none">
            <div
                className="flex items-center py-1 px-1 hover:bg-gray-100 rounded cursor-pointer"
                onClick={toggleExpand}
            >
                <span className="w-6 flex justify-center">
                    {node.hasChildren ? (
                        isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                    ) : (
                        <span className="w-4"></span>
                    )}
                </span>

                <span className="mr-2">{getNodeIcon()}</span>
                <span className="font-medium">{node.name}</span>
                <span className="ml-2 text-xs text-gray-500">
                    ({node.nodeClass}, NS: {node.namespaceIndex}, identifier: {node.identifier})
                </span>
                {
                    node.hasChildren && (
                        <Cable className="ml-2 hover:text-red-700" size={16} 
                            onClick={(e) => {
                                e.stopPropagation();
                                sendNodeToApi(node.namespaceIndex, node.identifier);
                            }}
                        />
                )}
                
                {loading && <span className="ml-2 text-xs text-blue-500">Loading...</span>}
            </div>
            {isExpanded && children.length > 0 && (
                <div className="ml-6">
                    {children.map(e => (
                        <TreeNode
                            key={e.identifier}
                            namespace={namespace}
                            node={e}
                            fetchChildren={fetchChildren}
                            serverUrl={serverUrl}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

const OpcUaBrowser = ({serverUrl, namespace, nodeId}) => {
    const [rootNode, setRootNode] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchRootNode = async () => {
        try {
            const response = await fetch(`${serverUrl}/browse/${namespace}/${nodeId}`);
            if (!response.ok) throw new Error('Failed to load root');

            let data;
            try {
                const text = await response.text();
                data = text ? JSON.parse(text) : null;
            } catch(err) {
                console.error(`JSON parsing error: ${err}`)
                data = null;
            }
            setRootNode(data);
        } catch (error) {
            console.error("Error fetching root node:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {  
        fetchRootNode();
    }, []);

    const fetchChildren = async (ns, nodeId) => {
        console.log(`fetchChildren: ${nodeId}`)
        console.log(`serverUrl: ${serverUrl}`)
        return await fetch(`${serverUrl}/browse/${ns}/${nodeId}`)
                        .then(response => {
                            if(!response.ok) throw new Error('Failed to load children')
                            return response.json();
                        });
    }

    if (loading) {
        return <div className="p-4 text-center">Loading OPC UA node tree...</div>
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">Error loading node tree: {error}</div>
    }

    return (
        <div className="p-4 border rounded-lg bg-white shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center">
                OPC UA Node Browser 
                <RotateCw 
                    className="text-green-600 ml-2 cursor-pointer" 
                    size={18} 
                    onClick={fetchRootNode}
                />
            </h2>
            <div className="border roudned p-2 bg-gray-50 overflow-auto max-h-96">
                {rootNode && <TreeNode namespace={namespace} node={rootNode} fetchChildren={fetchChildren} serverUrl={serverUrl} />}
            </div>
        </div>
    )
}

export default OpcUaBrowser;