

// Called when message received from main process
window.api.hostsList( (ev, data) => {
    hostsList = Object.entries(data)
    
    for (const key in hostsList) {

            const element = hostsList.key;
            console.log(key, element)

    }



} );

