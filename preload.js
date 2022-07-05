const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld( 'yogi_api', {


  getHostsList: () =>  ipcRenderer.invoke("get-hosts-list")

})

