const { app, shell, BrowserWindow, ipcMain, Menu, webContents } = require('electron')
const fs = require('fs');
const path = require('path')
const ping = require('ping')
const hostsListObj = require('./config/hosts.js');
const electron = require('electron');
const child_process = require('child_process');
const dialog = electron.dialog;
const nativeImage = require('electron').nativeImage;
var appIcon = nativeImage.createFromPath(__dirname + '/img/icon.png'); 
appIcon.setTemplateImage(true);
const packageJson = readPackageJson();
let win;

function runCmd(command, args, callback) {
    var child = child_process.spawn(command, args, {
        encoding: 'utf8',
        shell: true
    });

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data) => {
        data=data.toString();       
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data) => {
        win.webContents.send('mainprocess-response', data);
    });


    if (typeof callback === 'function')
        callback();
}

function readPackageJson(){
  return JSON.parse(fs.readFileSync(__dirname + '/package.json', 'utf8'))
}

function getAuthorName(){
  return packageJson.author
}

function statusedHosts(hostsListObj){

  let hostsList = Object.entries(hostsListObj)

  hostsList.forEach(async (group) => {
    group[1].forEach(  (host) => {
      ping.sys.probe(host.host, async function(isAlive){ 

        host.status = isAlive ? true : false
        let previousLastSeen = host.lastSeen ? host.lastSeen : false
        let lastSeen = isAlive ? new Date() : false 

        let data = {
          hostName : host.name,
          hostStatus : host.status,
          hostLastSeen : lastSeen ? lastSeen : previousLastSeen
        }
        
        win.webContents.send("update-host", data)

      });
    })
    
  })

    
}

function createWindow () {
  win = new BrowserWindow({
    width: 320,
    height: 480,
    icon: appIcon,
    backgroundColor:'#2e2c29',
    alwaysOnTop: true,
    webPreferences: {
        contextIsolation: true,
        sandbox: true,
        preload: path.join(__dirname, "preload.js")    
    }
  })


  win.setMenuBarVisibility(false)
  win.loadFile('index.html')


  ipcMain.handle("get-hosts-list", () => {
   return hostsListObj 
  } )

  ipcMain.handle("open-ssh", (ev, ip) => {
    runCmd("putty", [`-ssh ${ip}`])
  })

  ipcMain.handle("app-info", () => {
    return {
      electron_version: process.versions.electron,
      app_version: app.getVersion(),
      app_name : app.getName(),
      app_author: getAuthorName()
    }
  })

  ipcMain.handle("open-hosts", () => {
    let path =  __dirname + '\\config\\hosts.js'
    console.log(path)
    shell.openPath(path)
  })

}
    

let pingtimer = setInterval( () => {
    statusedHosts(hostsListObj)
}, 1000)



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


