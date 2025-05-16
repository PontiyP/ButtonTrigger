import React from 'react';
import {RefreshIcon} from "./RefrshIcon";

export function SettingsPanel({
                                  url,
                                  setUrl,
                                  reloadWebview,
                                  oscPort,
                                  setOscPort,
                                  applyPort,
                                  oscLog,
                                  onClose
                              }) {
    return (
        <div className="settings-panel">
            <div className="settings-header">
                <label>Settings</label>
                <button onClick={onClose}>✖</button>
            </div>
            <div>
                <label>URL</label>
                <div className="settings-url">
                    <input value={url} onChange={(e) => setUrl(e.target.value)} />
                    <button onClick={reloadWebview}>
                        <RefreshIcon color={"white"}/>
                    </button>
                </div>
            </div>
            <div>
                <label>OSC Port</label>
                <div className="settings-url">
                    <input
                        type="number"
                        value={oscPort}
                        onChange={(e) => setOscPort(e.target.value)}
                    />
                    <button onClick={applyPort}>
                        <RefreshIcon color={"white"}/>
                    </button>
                </div>
            </div>
            <hr/>

            <strong>OSC monitor:</strong>
            <div className="osc-monitor">
                {oscLog.slice(-20).map((m, i) => (
                    <div key={i}>{JSON.stringify(m)}</div>
                ))}
            </div>
        </div>
    );
}
