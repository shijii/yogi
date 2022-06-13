const {
  ipcRenderer,
  contextBridge
} = require("electron");

// Expose protected methods off of window (ie.
// window.api.sendToA) in order to use ipcRenderer
// without exposing the entire object

const api = {
  hostsList: (data) => ipcRenderer.on("hostsList", data ),
  
}

contextBridge.exposeInMainWorld("api", api);

