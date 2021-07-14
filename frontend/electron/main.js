
const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const url = require('path')

let mainWindow;

function createWindow () {
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true,
  });
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: `${__dirname}/preload.js`,
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  mainWindow.loadURL(startUrl)
  
  mainWindow.webContents.on('dom-ready', () => {
    const appVersion = app.getVersion();
    console.log(`Trying to send app version to renderer: ${appVersion}`)
    mainWindow.webContents.send('app_version', appVersion);

    autoUpdater.autoDownload = true;

    autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
      mainWindow.webContents.send('update_downloaded');
    });

    autoUpdater.on('update-available', () => {
      mainWindow.webContents.send('update_available');
    });
  
    autoUpdater.on('checking-for-update', () => {
      mainWindow.webContents.send('checking_for_update');
    })
  
    autoUpdater.on('update-available', () => {
      mainWindow.webContents.send('update_available');
    })
  })

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });


  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});


