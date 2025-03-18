import React, {useState} from 'react';

const OpcConnector = ({serverUrl, setServerUrl, setOpcConnected}) => {
    const [serverUrl, setServerUrl] = useState('http://localhost:8080');
    const [opcUrl, setOpcUrl] = useState('opc.tcp://192.168.0.114:4841/freeopcua/server');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [response, setResponse] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResponse('');

        try {
            const opcHost = {url: opcUrl};
            const url = `${serverUrl}/init`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(opcHost)
            });

            if(!response.ok) throw new Error(`Error sendMessage: ${response.status}`)
            
            const data = await response.json();
            setResponse(JSON.stringify(data, null, 2));
            if(data.result) {
                setOpcConnected(true);
            } else {
                setOpcConnected(false);
            }
        } catch(err) {
            setError(`${err.message}`)
            setOpcConnected(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='max-w-md mx-auto p-4 bg-white rounded shadow'>
            <form onSubmit={sendMessage}>
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-1'>HOST</label>
                    <input
                        type='text'
                        value='http://localhost:8080'
                        onChange={(e)=> setServerUrl(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium mb-1'>OPC-UA</label>
                    <input
                        type='text'
                        value='opc.tcp://192.168.0.114:4841/freeopcua/server'
                        onChange={(e)=> setOpcUrl(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button
                    type='submit'
                    disabled={loading}
                    className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300'
                >
                    {loading ? '전송 중...' : '전송'}
                </button>
            </form>

            { error && (
                <div className='mt-4'>
                    <h3 className='font-medium mb-2'>서버 응답:</h3>
                    <pre className='bg-gray-100 p-3 rounded overflow-x-auto'>
                        {response}
                    </pre>
                </div>
            )}
        </div>
    )
};

export default OpcConnector;