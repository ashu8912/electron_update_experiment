
const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const url = require('path');
const { Octokit } = require("@octokit/core");
const octokit = new Octokit();

let mainWindow;

function createWindow () {
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(process.resourcesPath, 'app/build', 'index.html'),
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
    console.log(appVersion);
    async function fetchReleases() {
      const response = await octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
          owner: 'ashu8912',
          repo: 'electron_update_experiment'
        })
        console.log(response.data);
   if(response.data.name !== appVersion) {
     mainWindow.webContents.send('update_available', {
       downloadURL: response.data.html_url,
       releaseNotes: response.data.body
     })
   }
  }
  fetchReleases()
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


