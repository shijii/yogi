const { app, BrowserWindow, ipcMain, Menu, webContents, ipcRenderer } = require('electron')

const path = require('path')
const ping = require('ping')
const hostsListObj = require('./config/hosts.js');


// console.log(hostsListObj)
let win;

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
    width: 800,
    height: 600,
    backgroundColor: "#111",
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


