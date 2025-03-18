import React, { useState, useEffect, useRef } from "react";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import OpcUaBrowser from "./OpcUaBrowser";
import OpcConnector from "./OpcConnector";

const OpcUaDataViewer = ({ serverId }) => {
    const [serverUrl, setServerUrl] = useState('http://localhost:8080');
    const [connected, setConnected] = useState(false);
    const [opcConnected, setOpcConnected] = useState(false);
    const [nodeValues, setNodeValues] = useState({});
    const clientRef = useRef(null);
    const subscriptionRef = useRef(null);

    const cleanup = () => {
        if (clientRef.current && clientRef.current.connected) {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
                subscriptionRef.current = null;
            }
            clientRef.current.deactivate();
            clientRef.current = null;
            setConnected(false);
            console.log('cleanup activated');
        }
    };

    // WebSocket 연결 설정 초기화
    useEffect(() => {
        if(opcConnected) {
            // 이전 연결 정리
            cleanup();
            
            // STOMP 클라이언트 생성
            const stompClient = new Client({
                webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
                debug: (str) => {
                    // console.log(str);
                },
                reconnectDelay: 5_000,
                heartbeatIncoming: 4_000,
                heartbeatOutgoing: 4_000
            });

            stompClient.onConnect = (frame) => {
                setConnected(true);
                console.log(`connected: ${frame}`);

                // OPC UA 데이터 구독
                const subscription = stompClient.subscribe(`/topic/opcua/${serverId}`, (message) => {
                    try {
                        const data = JSON.parse(message.body);
                        setNodeValues(data);
                    } catch(error) {
                        console.error(`Error parsing message: ${error}`);
                    }
                });

                // 구독 정보 저장
                subscriptionRef.current = subscription;
            };

            stompClient.onStompError = (frame) => {
                console.error(`STOMP error: ${frame.headers['message']}`)
                setConnected(false);
            };

            // 클라이언트 저장
            clientRef.current = stompClient;
            
            // 클라이언트 활성화
            stompClient.activate();
        } else {
            cleanup();
        }
        

        // component unmount callback: cleanup
        return cleanup;
    }, [serverId, opcConnected]);

    return (
        <div className="opcua-data-viewer">
            <h2>OPCUA Data Viewer</h2>
            <div className="connection-status">
                Status: { connected ? 'Connected' : 'Disconnected'}
            </div>
            <div>

            </div>
                {
                    connected && opcConnected ?
                    (<OpcUaBrowser serverUrl={serverUrl} />)
                    :
                    (<OpcConnector serverUrl={serverUrl} setServerUrl={setServerUrl} setOpcConnected={setOpcConnected}/>)
                }
            <h3>Node Values:</h3>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Node Id</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(nodeValues).map(([nodeId, value]) => (
                        <tr key={nodeId}>
                            <td>name</td>
                            <td>{nodeId}</td>
                            <td>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OpcUaDataViewer;