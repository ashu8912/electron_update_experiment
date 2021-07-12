
const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: `${__dirname}/preload.js`
    }
  });
  mainWindow.loadFile('index.html')
  
  mainWindow.webContents.on('dom-ready', () => {
    const appVersion = app.getVersion();
    console.log(`Trying to send app version to renderer: ${appVersion}`)
    mainWindow.webContents.send('app_version', appVersion)
  })

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });


  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available');
  });
  
  autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update_downloaded');
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


