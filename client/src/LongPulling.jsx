import React, {useEffect, useState} from 'react';
import axios from "axios";

const LongPulling = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-message', {
            message,
            id: Date.now()
        })
    }

    const subscribe = async () => {
        try {
            const {data} = await axios.get('http://localhost:5000/get-message')
            setMessages(prev => [data, ...prev])
            await subscribe()
        } catch (e) {
            setTimeout(() => {
                subscribe();
            }, 500)
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
                    <div>{message.message}</div>
                )}
            </div>
        </div>
    );
};

export default LongPulling;
