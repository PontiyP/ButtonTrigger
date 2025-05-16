import React from 'react';

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
                        <svg width="50" height="50" viewBox="0 0 64 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.08053 17.9194C18.9894 -2.2921 48.2625 0.194705 55.8439 22.6299" stroke="white" stroke-width="4"/>
                            <path d="M5.39617 26.1105L4.65725 15.7445L14.0039 20.2875L5.39617 26.1105Z" fill="white"/>
                            <path d="M54.5061 41.8343C44.3397 61.9175 15.1007 59.0567 7.8068 36.5265" stroke="white" stroke-width="4"/>
                            <path d="M58.2954 33.6917L58.9018 44.0663L49.614 39.4041L58.2954 33.6917Z" fill="white"/>
                        </svg>
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
                        <svg width="50" height="50" viewBox="0 0 64 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.08053 17.9194C18.9894 -2.2921 48.2625 0.194705 55.8439 22.6299" stroke="white" stroke-width="4"/>
                            <path d="M5.39617 26.1105L4.65725 15.7445L14.0039 20.2875L5.39617 26.1105Z" fill="white"/>
                            <path d="M54.5061 41.8343C44.3397 61.9175 15.1007 59.0567 7.8068 36.5265" stroke="white" stroke-width="4"/>
                            <path d="M58.2954 33.6917L58.9018 44.0663L49.614 39.4041L58.2954 33.6917Z" fill="white"/>
                        </svg>
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
