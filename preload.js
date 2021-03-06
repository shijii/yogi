const { contextBridge, ipcRenderer } = require('electron');


const api = {
  hostsList_EP: (data) => ipcRenderer.on("hostsListEv", data ),
}

contextBridge.exposeInMainWorld( 'yogi_api', {

  getHostsList: () =>  ipcRenderer.invoke("get-hosts-list"),
  getHostStatus:  (cb) =>  ipcRenderer.on("update-host", (cb)),
  openSSH: (ip) =>  ipcRenderer.invoke("open-ssh", ip),
  openHosts: () =>  ipcRenderer.invoke("open-hosts"),
  appInfo: () => ipcRenderer.invoke("app-info")
})

