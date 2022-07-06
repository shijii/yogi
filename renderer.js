
import UI from './objs/UI.js'

const hostsList = window.yogi_api.getHostsList().then( y => UI.generateHostsElement(y) )

const hostsStatus = window.yogi_api.getHostStatus((ev,data) => UI.updateHosts(data))

