import React, { useEffect, useRef, useState } from 'react';
import { useOscExecutor } from './hooks/useOscExecutor';
import { useOscPortControl } from './hooks/useOscPortControl';
import { useUrlControl } from './hooks/useUrlControl';
import { SettingsPanel } from './components/SettingsPanel';

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
                <SettingsPanel
                    url={url}
                    setUrl={setUrl}
                    reloadWebview={() => webviewRef.current?.loadURL(url)}
                    oscPort={oscPort}
                    setOscPort={setOscPort}
                    applyPort={applyPort}
                    oscLog={oscLog}
                    onClose={() => setSettingsOpen(false)}
                />
            )}
        </div>
    );
}

export default App;
