const { app, BrowserWindow, ipcMain, Menu, webContents } = require('electron')

const path = require('path')
const ping = require('ping')
const hostsListObj = require('./config/hosts.js');

console.log(hostsListObj)
let win;

// var hostsList = ['192.168.1.254', 'google.com', 'yahoo.com'];
// hostsList.forEach(function(host){
//     ping.sys.probe(host, function(isAlive){
//         var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
//         console.log(msg);
//     });
// });




function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        contextIsolation: true,
        sandbox: true,
        preload: path.join(__dirname, "preload.js")    
    }
  })

  win.loadFile('index.html')

  ipcMain.handle("get-hosts-list", () => {
   return hostsListObj 
  } )

}

app.whenReady().then(() => {
  createWindow()

 
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


