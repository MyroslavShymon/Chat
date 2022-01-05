import React, { useRef, useState} from 'react';

const Ws = () => {
    const [messages, setMessages] = useState([]);
    const [messageToSent, setMessageToSent] = useState('');
    const socket = useRef();
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('');

    const sendMessage = async () => {
        const message = {
            event: 'message',
            username,
            id: Date.now(),
            message: messageToSent
        }
        socket.current.send(JSON.stringify(message))
        setMessageToSent('')
    }

    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000');

        socket.current.onopen = () => {
            setConnected(true)
            console.log('socket is connected')
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }
        socket.current.onclose = () => {
            console.log('socket close')
        }
        socket.current.onerror = () => {
            console.log('socket error')
        }
    }

    if (!connected) {
        return (
            <div>
                <input
                    type="text"
                    placeholder={"Enter username"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                <button onClick={connect}>Open</button>
            </div>
        )
    }

    return (
        <div>
            <input type="text" value={messageToSent} onChange={(e) => setMessageToSent(e.target.value)}/>
            <button onClick={sendMessage}>Send message!</button>
            <div>
                {messages.map(message =>
                    <div key={message.id}>{message.event === 'connection' ?
                        <div>Username {message.username}</div> :
                        <div>{message.username}: {JSON.stringify(message.message)}</div>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Ws;
