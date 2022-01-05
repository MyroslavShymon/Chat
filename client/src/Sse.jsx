import React, {useEffect, useState} from 'react';
import axios from "axios";

const Sse = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-message', {
            message,
            id: Date.now()
        })
    }

    const subscribe = async () => {
        const eventSource = new EventSource('http://localhost:5000/connect')
        eventSource.onmessage = (event) => {
            console.log(event.data)
            const message = JSON.parse(event.data);
            setMessages(prev => [message, ...prev])
        }
    }

    useEffect(() => {
        subscribe();
    }, []);

    return (
        <div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button onClick={sendMessage}>Send message!</button>
            <div>
                {messages.map(message =>
                    <div key={message.id}>{message.message}</div>
                )}
            </div>
        </div>
    );
};

export default Sse;
