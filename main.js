const { app, BrowserWindow, ipcMain, Menu, webContents, ipcRenderer } = require('electron')

const path = require('path')
const ping = require('ping')
const hostsListObj = require('./config/hosts.js');
const electron = require('electron');
const child_process = require('child_process');
const dialog = electron.dialog;

let win;

// This function will output the lines from the script 
// and will return the full combined output
// as well as exit code when it's done (using the callback).
function run_script(command, args, callback) {
    var child = child_process.spawn(command, args, {
        encoding: 'utf8',
        shell: true
    });
    // You can also use a variable to save the output for when the script closes later
    // child.on('error', (error) => {
    //     dialog.showMessageBox({
    //         title: 'Error',
    //         type: 'warning',
    //         message: 'Error occured.\r\n' + error
    //     });
    // });

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data) => {
        //Here is the output
        data=data.toString();   
        console.log(data);      
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data) => {
        // Return some data to the renderer process with the mainprocess-response ID
        win.webContents.send('mainprocess-response', data);
        //Here is the output from the command
        console.log(data);  
    });

    // child.on('close', (code) => {
    //     //Here you can get the exit code of the script  
    //     switch (code) {
    //         case 0:
    //             dialog.showMessageBox({
    //                 title: 'End of Process',
    //                 type: 'info',
    //                 message: 'End process.\r\n'
    //             });
    //             break;
    //     }

    // });
    if (typeof callback === 'function')
        callback();
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
    width: 220,
    height: 400,
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

  ipcMain.handle("open-ssh", (ev, ip) => {
    run_script("putty", [`-ssh ${ip}`])
  })

  }
    

let pingtimer = setInterval( () => {
    statusedHosts(hostsListObj)
}, 1000)



app.whenReady().then(() => {

  createWindow()

  setTimeout(()=> {
    win.webContents.send("app-info", {
      electron_version: process.versions.electron,
      app_version: app.getVersion(),
      app_name : app.getName()
    })

  },1000)







 
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


