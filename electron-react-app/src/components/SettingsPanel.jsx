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
                <button onClick={onClose}>✖</button>
            </div>

            <label style={{ marginTop: 10 }}>URL страницы</label>
            <input value={url} onChange={(e) => setUrl(e.target.value)} />
            <button onClick={reloadWebview} style={{ marginTop: 10 }}>
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
    );
}
