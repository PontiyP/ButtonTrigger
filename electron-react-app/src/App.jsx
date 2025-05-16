import React, { useEffect, useRef, useState } from 'react';

function App() {
    const webviewRef = useRef(null);
    const [url, setUrl] = useState(() => localStorage.getItem('url') || 'https://ets.weplay.tv');
    const [oscLog, setOscLog] = useState([]);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [oscPort, setOscPort] = useState(() => parseInt(localStorage.getItem('oscPort')) || 3333);

    useEffect(() => {
        const handler = (event, msg) => {
            setOscLog((prev) => [...prev, msg]);
            handleOSCCommand(msg);
        };
        window.electronAPI?.subscribeOSCMessage(handler);
    }, []);

    const handleOSCCommand = (msg) => {
        if (!webviewRef.current || !msg.address) return;

        const parts = msg.address.split("/").filter(Boolean);
        const mode = parts[0];
        const value = parts[1];
        const keyword = parts[parts.length - 1];

        let script = '';

        if (mode === 'id') {
            script = `
        try {
          const el = document.getElementById("${value}");
          if (el) {
            el.click();
            console.log('✔️ Clicked element by id: ${value}');
          } else {
            console.warn('❌ No element found with id: ${value}');
          }
        } catch (err) {
          console.error('⚠️ Error in injected script:', err);
        }
      `;
        } else if (mode === 'class') {
            script = `
        try {
          const matches = document.querySelectorAll(".${value}");
          if (matches.length > 0) {
            matches.forEach(el => el.click());
            console.log('✔️ Clicked all elements with class: ${value}');
          } else {
            console.warn('❌ No elements found with class: ${value}');
          }
        } catch (err) {
          console.error('⚠️ Error in injected script:', err);
        }
      `;
        } else if (mode === 'text' && parts[1] === 'all') {
            script = `
        try {
          const keyword = "${keyword}".toLowerCase();
          const elements = Array.from(document.querySelectorAll('button, input[type=button], input[type=submit], [role=button], a'));
          const matches = elements.filter(el => {
            const text = el.innerText || el.value || el.textContent;
            return text && text.toLowerCase().trim() === keyword;
          });

          if (matches.length > 0) {
            matches.forEach(el => el.click());
            console.log('✔️ Clicked all elements with text: ${keyword}');
          } else {
            console.warn('❌ No matching elements found for keyword: ${keyword}');
          }
        } catch (err) {
          console.error('⚠️ Error in injected script:', err);
        }
      `;
        } else if (mode === 'all') {
            script = `
        try {
          const keyword = "${keyword}".toLowerCase();
          const elements = Array.from(document.querySelectorAll('button, input[type=button], input[type=submit], [role=button], a'));
          const matches = elements.filter(el => {
            const text = el.innerText || el.value || el.textContent;
            return text && text.toLowerCase().trim() === keyword;
          });

          if (matches.length > 0) {
            matches.forEach(el => el.click());
            console.log('✔️ Clicked all elements with text: ${keyword}');
          } else {
            console.warn('❌ No matching elements found for keyword: ${keyword}');
          }
        } catch (err) {
          console.error('⚠️ Error in injected script:', err);
        }
      `;
        } else {
            script = `
        try {
          const keyword = "${keyword}".toLowerCase();
          const elements = Array.from(document.querySelectorAll('button, input[type=button], input[type=submit], [role=button], a'));
          const match = elements.find(el => {
            const text = el.innerText || el.value || el.textContent;
            return text && text.toLowerCase().trim() === keyword;
          });

          if (match) {
            match.click();
            console.log('✔️ Clicked element with text: ${keyword}');
          } else {
            console.warn('❌ No matching element found for keyword: ${keyword}');
          }
        } catch (err) {
          console.error('⚠️ Error in injected script:', err);
        }
      `;
        }

        webviewRef.current.executeJavaScript(script);
    };

    const handleChangePort = () => {
        const port = parseInt(oscPort);
        if (!isNaN(port)) {
            localStorage.setItem('oscPort', port);
            window.electronAPI.changeOscPort(port);
        }
    };

    const handleChangeUrl = (value) => {
        setUrl(value);
        localStorage.setItem('url', value);
    };

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
                    <input value={url} onChange={(e) => handleChangeUrl(e.target.value)} />
                    <button onClick={() => webviewRef.current?.loadURL(url)} style={{ marginTop: 10 }}>
                        Перезагрузить
                    </button>

                    <label style={{ marginTop: 20 }}>OSC порт</label>
                    <input
                        type="number"
                        value={oscPort}
                        onChange={(e) => setOscPort(e.target.value)}
                    />
                    <button onClick={handleChangePort} style={{ marginTop: 10 }}>Сменить порт</button>

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
