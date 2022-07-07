
import UI from './objs/UI.js'

const hostsList = window.yogi_api.getHostsList().then( hosts => UI.generateHostsElement(hosts) )
const hostsStatus = window.yogi_api.getHostStatus((ev,data) => UI.updateHosts(data))
const appInfo = window.yogi_api.appInfo().then( appData => { UI.appInfo(appData)})


document.querySelector('#openHosts').addEventListener('click', () => {
  window.yogi_api.openHosts()
})


