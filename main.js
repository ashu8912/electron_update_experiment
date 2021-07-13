
const { app, BrowserWindow, dialog, autoUpdater } = require('electron');

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

  autoUpdater.autoDownload = true;

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available');
  });
  
  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }
  
    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
    mainWindow.webContents.send('update_downloaded');
  });

  autoUpdater.on('checking-for-update', () => {
    mainWindow.webContents.send('checking_for_update');
  })

  autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available');
  })
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


