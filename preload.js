const {
  ipcRenderer,
  contextBridge
} = require("electron");

// Expose protected methods off of window (ie.
// window.api.sendToA) in order to use ipcRenderer
// without exposing the entire object
contextBridge.exposeInMainWorld("api", {

  sendToA: function(){
      ipcRenderer.send("B");
  },

  receiveFromD: function(func){
      // ipcRenderer.on("invioDaMain", (event, ...args) => func(event, ...args));       
      ipcRenderer.on("invioDaMain", (event, ...args) => console.log(...args));       

  }

});