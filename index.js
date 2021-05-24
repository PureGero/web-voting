const { app, BrowserWindow } = require('electron');
const path = require('path');
const sql = require('mssql');

const { ipcMain } = require('electron');

ipcMain.handle('perform-action', async (event, text) => {
  await sql.connect('Server=server;Database=database;User Id=usersname;Password=password;Encrypt=true')
  const result = await sql.query(`select * from mytable where id = ${value}`);
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

  win.loadFile('index.html');
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