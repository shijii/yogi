

var hostsList = []



// Called when message received from main process
window.api.receiveFromD((data) => {
    console.log(`Received ${data} from main process`);
});

// Send a message to the main process
window.api.sendToA();