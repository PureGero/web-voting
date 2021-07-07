const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const httpServer = require('./http_server');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800
  });

  httpServer.onReady(() => win.loadURL(httpServer.getLocalhostURL()));
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});