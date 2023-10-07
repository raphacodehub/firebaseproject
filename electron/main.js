// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const browserSync = require('browser-sync').create();
const { exec } = require('child_process');

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, './preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./src/index.html');

  // Login recusado
  ipcMain.on('loginRecused', function() {
    mainWindow.close()
  });

  // Browser-sync:

  // recebe uma solicitação para iniciar browser-sync.
  ipcMain.on('initServer', function() {

    // Incia o servidor.
    browserSync.init({
      server: {
          // Define a pasta base para o servidor.
          baseDir: "./public/"
      },
      // Define a porta.
      port: 5000,
      // ativa a atualização em tempo real.
      files: ["./public/index.html"],
      open: true, // Ativa/desativa a abertura do utl no navegador.
      notify: false // Desativa as notificações do Browser-sync.
    });
  });

  // Deploy:
  
  // recebe uma solicitação para fazer deploy do site.
  ipcMain.on('deploy', function() {

    // Executa a linha de comando: firebase deploy.
    exec('firebase deploy', function(error, stdout) {
      console.log(`${stdout}`);
      if (error) {
        console.log(`${error}`);
        mainWindow.webContents.send('deployError');
      } else {
        mainWindow.webContents.send('deploySucess');
      }
    });
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})

// In this file you can include the rest of your app's specific main process
// code. Você também pode colocar eles em arquivos separados e requeridos-as aqui.