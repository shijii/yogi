
<<<<<<< Updated upstream
import UI from './objs/UI.js'

const hostsList = window.yogi_api.getHostsList().then( hosts => UI.generateHostsElement(hosts) )
const hostsStatus = window.yogi_api.getHostStatus((ev,data) => UI.updateHosts(data))
const appInfo = window.yogi_api.appInfo().then( appData => { UI.appInfo(appData)})

=======
import UI from "";
// Called when message received from main process
window.api.hostsListF( (ev, hostsList) => {
    hostsList = Object.entries(hostsList)

    hostsList.forEach(group => {
        
        console.log("GROUPNAME", group[0])
        console.log("LIST OF HOSTS", group[1])
>>>>>>> Stashed changes

document.querySelector('#openHosts').addEventListener('click', () => {
  window.yogi_api.openHosts()
})


