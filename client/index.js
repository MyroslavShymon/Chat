const chat = document.getElementById("chat");

const ws = new WebSocket("ws://localhost:9000", 'echo-protocol')

ws.onmessage = (message) => {
    const messages = JSON.parse(message.data);
    messages.forEach((val) => {
        const messageEL = document.createElement('div');
        messageEL.appendChild(document.createTextNode(`${val.name}: ${val.message}`));
        chat.appendChild(messageEL);
    });
}
const send = (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    ws.send(JSON.stringify({name, message}));
    return false;
}

const form = document.getElementById('message-form');
form.addEventListener('submit', send);
