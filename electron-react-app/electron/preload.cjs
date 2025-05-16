const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    subscribeOSCMessage: (callback) => {
        ipcRenderer.removeAllListeners('osc-message');
        ipcRenderer.on('osc-message', callback);
    },
    changeOscPort: (port) => ipcRenderer.send('change-osc-port', port),
});
