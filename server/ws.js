import {WebSocketServer} from 'ws';

const wss = new WebSocketServer({
    port: 5000,
}, () => console.log("Server started on port 5000"))

wss.on('connection', (ws) => {
    ws.id = Date.now();
    ws.aaa = "aaa";
    ws.on('message', (message) => {
        message = JSON.parse(message)
        console.log("2", message)
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }

    })
})

const broadcastMessage = (message) => {
    wss.clients.forEach(client => {
        console.log('client', client)
        client.send(JSON.stringify(message));
    })
    console.log(message)

}

