const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const osc = require('osc');

let win;
let udpPort;
const isDev = !app.isPackaged;

function createWindow() {

    const distPath = path.join(app.getAppPath(), 'dist');
    const indexPath = path.join(distPath, 'index.html');

    console.log("🧭 Electron will load:", indexPath);  // <--- это ключ!

    win = new BrowserWindow({
        width: 1280,
        height: 1080,
        icon: path.join(__dirname, 'assets', 'icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            nodeIntegration: false,
            contextIsolation: true,
            webviewTag: true,
        },
    });

    if (isDev) {
        win.loadURL('http://localhost:5173');
        // win.webContents.openDevTools({ mode: 'detach' });
    } else {
        console.log('🧭 Trying to load:', path.join(app.getAppPath(), 'dist/index.html'));//////
        win.loadFile(indexPath);
    }
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
