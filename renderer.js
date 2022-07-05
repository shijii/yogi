
import UI from './objs/UI.js'

const imieihosts = window.yogi_api.getHostsList().then( y => UI.generateHostsElement(y) )

