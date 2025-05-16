import React, { useEffect, useRef, useState } from 'react';
import { useOscExecutor } from './hooks/useOscExecutor';
import { useOscPortControl } from './hooks/useOscPortControl';
import { useUrlControl } from './hooks/useUrlControl';

function App() {
    const webviewRef = useRef(null);
    const [oscLog, setOscLog] = useState([]);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const { url, setUrl } = useUrlControl();
    const { oscPort, setOscPort, applyPort } = useOscPortControl();
    const executeOSC = useOscExecutor(webviewRef);

    useEffect(() => {
        const handler = (event, msg) => {
            setOscLog((prev) => [...prev, msg]);
            executeOSC(msg);
        };
        window.electronAPI?.subscribeOSCMessage(handler);
    }, [executeOSC]);

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <webview
                ref={webviewRef}
                src={url}
                style={{ width: '100%', height: '100%' }}
                partition="persist:main"
            />

            {!settingsOpen && (
                <button
                    onClick={() => setSettingsOpen(true)}
                    style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
                >
                    ⚙️
                </button>
            )}

            {settingsOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 300,
                        height: '100%',
                        backgroundColor: '#f9f9f9',
                        boxShadow: '-2px 0 5px rgba(0,0,0,0.2)',
                        zIndex: 20,
                        padding: 20,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label>Настройки</label>
                        <button onClick={() => setSettingsOpen(false)}>✖</button>
                    </div>

                    <label style={{ marginTop: 10 }}>URL страницы</label>
                    <input value={url} onChange={(e) => setUrl(e.target.value)} />
                    <button onClick={() => webviewRef.current?.loadURL(url)} style={{ marginTop: 10 }}>
                        Перезагрузить
                    </button>

                    <label style={{ marginTop: 20 }}>OSC порт</label>
                    <input
                        type="number"
                        value={oscPort}
                        onChange={(e) => setOscPort(e.target.value)}
                    />
                    <button onClick={applyPort} style={{ marginTop: 10 }}>Сменить порт</button>

                    <hr style={{ margin: '20px 0' }} />

                    <strong>OSC-сообщения:</strong>
                    <div style={{ flex: 1, overflowY: 'auto', fontSize: 12, background: '#fff', padding: 5, border: '1px solid #ccc' }}>
                        {oscLog.slice(-20).map((m, i) => (
                            <div key={i}>{JSON.stringify(m)}</div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
