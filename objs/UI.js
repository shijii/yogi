export default class UI {


    static generateHostsElement(hostsList) {
    
      hostsList = Object.entries(hostsList)
  
      hostsList.forEach(group => {
          
        //   console.log("GROUPNAME", group[0])
        //   console.log("LIST OF HOSTS", group[1])
  
          let groupContainer = document.createElement('section')
          groupContainer.id = group[0]
          groupContainer.name = group[0]
          groupContainer.textContent = group[0].toUpperCase()
          groupContainer.classList.add('hostsGroup')
  
          group[1].forEach((host) => {
  
              let hostContainer = document.createElement('div')
              hostContainer.id = host.name
              hostContainer.name = host.name
              hostContainer.innerHTML = `<div class="hostName">${host.name}</div>
                                        <div class="hostIp"> ${host.host}</div>`
              hostContainer.addEventListener("dblclick", () => {
                console.info(`executing ssh on ${host.host}`)
                window.yogi_api.openSSH(host.host)
            })     
            //   hostContainer.addEventListener("click", () => alert(host.host))                 

              hostContainer.classList.add('hostEntry')
  
              groupContainer.append(hostContainer)
  
          })
  
          document.querySelector('main').append(groupContainer)
  
      });
  
  
  }

  static updateHosts(hostData){

    let targetHost = document.querySelector(`#${hostData.hostName}`)
    hostData.hostStatus ?  targetHost.classList.add("online") : targetHost.classList.add("offline")
    targetHost.setAttribute("alt",hostData.hostLastSeen)

  }


  static appInfo(appInfo){
    console.log(appInfo)
    document.querySelector('#app-version').textContent = appInfo.app_version
    document.querySelector('#app-name').textContent = appInfo.app_name
    document.querySelector('#electron-version').textContent = appInfo.electron_version
  }

}
