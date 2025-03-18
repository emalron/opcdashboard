import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import OpcUaBrowser from "./OpcUaBrowser";
import OpcConnector from "./OpcConnector";
import OpcNodeValue from "./OpcNodeValue";

const OpcUaDataViewer = ({ serverId, namespace, nodeId }) => {
  const [serverUrl, setServerUrl] = useState("http://localhost:8080");
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
      console.log("cleanup activated");
    }
  };

  // WebSocket 연결 설정 초기화
  useEffect(() => {
    if (opcConnected) {
      // 이전 연결 정리
      cleanup();

      // STOMP 클라이언트 생성
      const stompClient = new Client({
        webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
        debug: (str) => {
          // console.log(str);
        },
        reconnectDelay: 5_000,
        heartbeatIncoming: 4_000,
        heartbeatOutgoing: 4_000,
      });

      stompClient.onConnect = (frame) => {
        setConnected(true);
        console.log(`connected: ${frame}`);

        // OPC UA 데이터 구독
        const subscription = stompClient.subscribe(`/topic/opcua/${serverId}`, (message) => {
          try {
            const data = JSON.parse(message.body);
            setNodeValues(data);
          } catch (error) {
            console.error(`Error parsing message: ${error}`);
          }
        });

        // 구독 정보 저장
        subscriptionRef.current = subscription;
      };

      stompClient.onStompError = (frame) => {
        console.error(`STOMP error: ${frame.headers["message"]}`);
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
      <h3 className="mt-8 font-bold text-lg">OPC UA Data Viewer</h3>
      <div className="connection-status flex justify-between mt-2 mb-4 bg-gray-50 p-3 rounded-sm border border-gray-200">
        <span className="text-base text-gray-500 font-light">Status</span>
        {connected ? <span className="text-base font-rg text-sky-500">Connected</span> : <span className="text-base font-rg text-red-400">Disconnected</span>}
      </div>
      <div></div>
      {connected && opcConnected ? (
        <>
          <OpcUaBrowser serverUrl={serverUrl} namespace={namespace} nodeId={nodeId} />
          <OpcNodeValue nodeValues={nodeValues} />
        </>
      ) : (
        <OpcConnector serverUrl={serverUrl} setServerUrl={setServerUrl} setOpcConnected={setOpcConnected} />
      )}
    </div>
  );
};

export default OpcUaDataViewer;
