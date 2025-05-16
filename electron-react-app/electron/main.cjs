const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const osc = require('osc');

let win;
let udpPort;

function createWindow() {
    win = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            nodeIntegration: false,
            contextIsolation: true,
            webviewTag: true,
        },
    });

    win.loadURL('http://localhost:5173');
}

function startOscServer(port = 3333) {
    if (udpPort) {
        try {
            udpPort.close();
        } catch (e) {
            console.warn('Error closing previous OSC port:', e);
        }
    }

    udpPort = new osc.UDPPort({
        localAddress: '0.0.0.0',
        localPort: port,
    });

    udpPort.on('message', (oscMsg) => {
        console.log('OSC received:', oscMsg);
        if (win) win.webContents.send('osc-message', oscMsg);
    });

    udpPort.open();
    console.log('OSC listener running on port', port);
}

ipcMain.on('change-osc-port', (event, newPort) => {
    startOscServer(newPort);
});

app.whenReady().then(() => {
    createWindow();
    startOscServer();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
