
import UI from './objs/UI.js'

const hostsList = window.yogi_api.getHostsList().then( hosts => UI.generateHostsElement(hosts) )
const hostsStatus = window.yogi_api.getHostStatus((ev,data) => UI.updateHosts(data))
const appInfo = window.yogi_api.appInfo((ev, appData) => UI.appInfo(appData))





