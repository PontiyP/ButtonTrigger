import React from 'react';
import {RefreshIcon} from "./RefrshIcon";
import {ClearIcon} from "./ClearIcon";

export function SettingsPanel({
                                  url,
                                  setUrl,
                                  reloadWebview,
                                  oscPort,
                                  applyPort,
                                  oscLog,
                                  onClose,
                                  onClearLog
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
                        <RefreshIcon color={"#eeee"}/>
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
                        <RefreshIcon color={"#eeee"}/>
                    </button>
                </div>
            </div>
            <hr/>
            <div className="osc-monitor-header">
                <label>OSC monitor:</label>
                <button onClick={onClearLog}>
                    <ClearIcon color={"#eeee"}/>
                </button>
            </div>
            <div className="osc-monitor">
                {oscLog.slice(-30).map((m, i) => (
                    <div key={i}>{JSON.stringify(m)}</div>
                ))}
            </div>
        </div>
    );
}
