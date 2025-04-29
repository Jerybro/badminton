const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });

  // 加载应用
  if (isDev) {
    win.loadURL('http://localhost:3000');
    // 打开开发者工具
    win.webContents.openDevTools();
  } else {
    // 在生产环境中使用相对路径
    const indexPath = path.join(app.getAppPath(), 'build', 'index.html');
    console.log('Loading index from:', indexPath);
    win.loadFile(indexPath).catch(err => {
      console.error('Failed to load index.html:', err);
    });
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}); 