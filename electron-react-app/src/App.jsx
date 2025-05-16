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
        <div className="webview">
            <webview
                ref={webviewRef}
                src={url}
                partition="persist:main"
            />

            {!settingsOpen && (
                <button
                    onClick={() => setSettingsOpen(true)}
                    className="settings-button"
                >

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
