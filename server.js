import {WebSocketServer} from 'ws';
import {v4 as uuid} from "uuid";
import {writeFile, readFileSync, existsSync} from "fs";

const log = existsSync('log') && readFileSync('log');
const clients = {};
const messages = JSON.parse(log) || [];

const wss = new WebSocketServer({port: 9000});
wss.on("connection", (ws) => {
    const id = uuid();
    clients[id] = ws;
    ws.send(JSON.stringify(messages));

    ws.on('message', (rawMessage) => {
        const {name, message} = JSON.parse(rawMessage);
        messages.push({name, message})
        for (const id in clients) {
            console.log(clients)
            clients[id].send(JSON.stringify([{name, message}]))
        }
    })

    ws.on('close', () => {
        delete clients[id];
    })
})

process.on('SIGINT', () => {
    wss.close();
    writeFile('log', JSON.stringify(messages), err => {
        if (err) {
            console.log(err);
        }
        process.exit();
    });
})
