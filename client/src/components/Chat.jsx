import React, {useEffect, useRef, useState} from 'react';
import queryString from 'query-string'
import io from "socket.io-client";
import {useLocation, useParams, useSearchParams} from "react-router-dom";


const Chat = () => {
    const [room, setRoom] = useState('');
    const [name, setName] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const socket = useRef();
    const search = useLocation().search;

    useEffect(() => {
        socket.current = io('localhost:5000');

        const name = new URLSearchParams(search).get('name');
        const room = new URLSearchParams(search).get('room');

        setName(name)
        setRoom(room)

        socket.current.emit('join', {name, room}, () => {

        })

        return () => {
            socket.current.emit('disconnect')

            socket.current.off()
        }
    }, []);

    useEffect(() => {
        console.log(    "messages")
        socket.current.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.current.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return (
        <div>
            Chat
            <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={(event) => event.key === "Enter" ? sendMessage(event) : null}
            />
            {messages.map((message) => <div>
                {message.user}: {message.text}
            </div>)}
        </div>
    );
};

export default Chat;
