const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const httpServer = require('./http_server');

let sql;
let trustedConnectionEnabled = false;

try {
  sql = require('mssql/msnodesqlv8');
  trustedConnectionEnabled = true;
} catch (error) {
  sql = require('mssql');
}

ipcMain.handle('get-trustedConnectionEnabled', async (event) => {
  return trustedConnectionEnabled;
});

ipcMain.handle('perform-action', async (event, sqlConfig) => {
  /* const sqlConfig = {
    domain: '',
    user: '',
    password: '',
    database: 'IDAttend2021',
    server: '',
    options: {
      encrypt: false, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
      trustedConnection: false
    }
  }; */
  await sql.connect(sqlConfig);
  const result = await sql.query(`select * from dbo.tblStudents where id = ${value}`);
  console.dir(result);
  return result;
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
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