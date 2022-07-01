

// Called when message received from main process
window.api.hostsListF( (ev, hostsList) => {
    hostsList = Object.entries(hostsList)

    console.error(hostsList)
    hostsList.forEach(group => {
        
        console.log("GROUPNAME", group[0])
        console.log("LIST OF HOSTS", group[1])

        groupContainer = document.createElement('section')
        groupContainer.id = group[0]
        groupContainer.name = group[0]
        groupContainer.textContent = group[0]
        groupContainer.classList.add('hostsGroup')

        group[1].forEach((host) => {

            hostContainer = document.createElement('div')
            hostContainer.id = host.name
            hostContainer.name = host.name
            hostContainer.textContent = `${host.name}: ${host.host}`
            hostContainer.classList.add('hostEntry')

            groupContainer.append(hostContainer)

        })

        document.querySelector('main').append(groupContainer)

    });

} );

